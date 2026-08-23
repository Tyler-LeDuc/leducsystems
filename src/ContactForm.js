import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { SITE } from './data/site';

/* EmailJS wiring — public key is initialised once in App.js. */
const SERVICE_ID = 'service_zeogjbm';
const TEMPLATE_ID = 'template_mfizbds';

const CONTACT_EMAIL = SITE.email;
const DRAFT_KEY = 'ldsContactDraft';
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

const EMPTY_VALUES = {
  name: '',
  email: '',
  company: '',
  phone: '',
  companySize: '',
  projectType: '',
  timeline: '',
  details: '',
};

const FIELD_ORDER = ['name', 'email', 'company', 'phone', 'companySize', 'projectType', 'timeline', 'details'];

const COMPANY_SIZES = ['Just me', '2-10', '11-50', '51-200', '200+'];
const PROJECT_TYPES = [
  'New product build',
  'Add AI to an existing product',
  'Internal tool or automation',
  'Not sure yet',
];
const TIMELINES = ['ASAP', 'Next 1-3 months', 'This quarter', 'Exploring'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/* ── Pure helpers ──────────────────────────────────────────────────────── */

const digitsOnly = (value) => value.replace(/\D/g, '');

const formatPhone = (value) => {
  const digits = digitsOnly(value).slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const validateField = (name, values) => {
  switch (name) {
    case 'name':
      return values.name.trim().length < 2 ? 'Enter your name.' : '';
    case 'email':
      if (!values.email.trim()) return 'Enter your email address.';
      return EMAIL_PATTERN.test(values.email.trim()) ? '' : 'Enter a valid email address.';
    case 'phone':
      if (!values.phone.trim()) return '';
      return digitsOnly(values.phone).length < 10 ? 'Enter a 10-digit phone number, or leave this blank.' : '';
    case 'details':
      return values.details.trim().length < 10
        ? 'A sentence or two about what you want built is enough to start.'
        : '';
    default:
      return '';
  }
};

const validateAll = (values) => {
  const found = {};
  FIELD_ORDER.forEach((name) => {
    const message = validateField(name, values);
    if (message) found[name] = message;
  });
  return found;
};

const buildSubject = (values) => `New inquiry - ${values.company.trim() || values.name.trim()}`;

const buildMessage = (values) => {
  const lines = [`Name: ${values.name.trim()}`, `Email: ${values.email.trim()}`];
  if (values.company.trim()) lines.push(`Company: ${values.company.trim()}`);
  if (values.phone.trim()) lines.push(`Phone: ${values.phone.trim()}`);
  if (values.companySize) lines.push(`Company size: ${values.companySize}`);
  if (values.projectType) lines.push(`Project type: ${values.projectType}`);
  if (values.timeline) lines.push(`Timeline: ${values.timeline}`);
  lines.push('', 'What are you trying to build?', values.details.trim());
  return lines.join('\n');
};

const readAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('Could not read the file.'));
    reader.readAsDataURL(file);
  });

const getFocusable = (node) => {
  if (!node) return [];
  return Array.from(node.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (el) => el.type !== 'hidden' && el.getClientRects().length > 0
  );
};

const readDraft = () => {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    const restored = {};
    Object.keys(EMPTY_VALUES).forEach((key) => {
      if (typeof parsed[key] === 'string') restored[key] = parsed[key];
    });
    return restored;
  } catch (err) {
    return null;
  }
};

/* ── Field wrapper ─────────────────────────────────────────────────────── */

const Field = ({ id, label, required, error, hint, full, children }) => (
  <div className={full ? 'field field--full' : 'field'} data-invalid={error ? 'true' : undefined}>
    <label className="field__label" htmlFor={id}>
      {label}
      {required ? (
        <span className="field__req" aria-hidden="true">
          {' *'}
        </span>
      ) : null}
    </label>
    {children}
    {error ? (
      <p className="field__error" id={`${id}-error`}>
        {error}
      </p>
    ) : null}
    {!error && hint ? (
      <p className="field__hint" id={`${id}-hint`}>
        {hint}
      </p>
    ) : null}
  </div>
);

/* ── Contact form ──────────────────────────────────────────────────────── */

const ContactForm = ({ embedded = false, isOpen = false, onClose }) => {
  const uid = useId();
  const formRef = useRef(null);
  const modalRef = useRef(null);
  const controlRefs = useRef({});
  const refSetters = useRef({});
  const fileInputRef = useRef(null);
  const previouslyFocused = useRef(null);
  const overlayPressed = useRef(false);
  const onCloseRef = useRef(onClose);

  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [status, setStatus] = useState('idle');

  const isModal = !embedded;
  const subject = useMemo(() => buildSubject(values), [values]);
  const message = useMemo(() => buildMessage(values), [values]);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  const requestClose = useCallback(() => {
    if (typeof onCloseRef.current === 'function') onCloseRef.current();
  }, []);

  /* Stable ref callback per field, so React does not detach on every render. */
  const registerControl = useCallback((name) => {
    if (!refSetters.current[name]) {
      refSetters.current[name] = (element) => {
        controlRefs.current[name] = element;
      };
    }
    return refSetters.current[name];
  }, []);

  /* Draft restore (once, on mount). */
  useEffect(() => {
    const draft = readDraft();
    if (draft) setValues((prev) => ({ ...prev, ...draft }));
  }, []);

  /* Draft save on every change until the message is away. */
  useEffect(() => {
    if (status === 'success') return;
    try {
      const hasContent = Object.keys(EMPTY_VALUES).some((key) => values[key].trim() !== '');
      if (hasContent) window.localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      else window.localStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      /* Storage unavailable (private mode, quota) — drafts are a convenience only. */
    }
  }, [values, status]);

  /* Modal: scroll lock, focus trap, Escape, focus restore. */
  useEffect(() => {
    if (embedded || !isOpen) return undefined;

    const dialog = modalRef.current;
    previouslyFocused.current = document.activeElement;

    const initial = getFocusable(dialog);
    if (initial.length > 0) initial[0].focus();
    else if (dialog) dialog.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        requestClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = getFocusable(modalRef.current);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const inside = modalRef.current && modalRef.current.contains(active);

      if (event.shiftKey && (!inside || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!inside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = previousOverflow;
      const restore = previouslyFocused.current;
      if (restore && typeof restore.focus === 'function') restore.focus();
    };
  }, [embedded, isOpen, requestClose]);

  /* Modal: start clean the next time it opens. */
  useEffect(() => {
    if (embedded || isOpen) return;
    setStatus('idle');
    setErrors({});
    setTouched({});
    setFile(null);
    setFileError('');
  }, [embedded, isOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === 'phone' ? formatPhone(value) : value;
    const next = { ...values, [name]: nextValue };
    setValues(next);

    /* Once a field has been flagged, correct the error live rather than on the next blur. */
    if (touched[name] || errors[name]) {
      const nextMessage = validateField(name, next);
      setErrors((current) => {
        const updated = { ...current };
        if (nextMessage) updated[name] = nextMessage;
        else delete updated[name];
        return updated;
      });
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const nextMessage = validateField(name, values);
    setErrors((prev) => {
      const updated = { ...prev };
      if (nextMessage) updated[name] = nextMessage;
      else delete updated[name];
      return updated;
    });
  };

  const handleFileChange = (event) => {
    const selected = event.target.files && event.target.files[0];
    if (!selected) {
      setFile(null);
      setFileError('');
      return;
    }
    if (selected.size > MAX_ATTACHMENT_BYTES) {
      event.target.value = '';
      setFile(null);
      setFileError('That file is over 5 MB. Send a smaller file, or link to it in your message.');
      return;
    }
    setFile(selected);
    setFileError('');
  };

  const resetForm = useCallback(() => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setTouched({});
    setFile(null);
    setFileError('');
    setStatus('idle');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const found = validateAll(values);
    setErrors(found);
    setTouched((prev) => {
      const next = { ...prev };
      FIELD_ORDER.forEach((name) => {
        next[name] = true;
      });
      return next;
    });

    const firstInvalid = FIELD_ORDER.find((name) => found[name]);
    if (firstInvalid) {
      const control = controlRefs.current[firstInvalid];
      if (control && typeof control.focus === 'function') control.focus();
      return;
    }

    setStatus('submitting');

    const templateParams = {
      from_name: values.name.trim(),
      from_email: values.email.trim(),
      to_email: CONTACT_EMAIL,
      reply_to: values.email.trim(),
      subject,
      message,
    };

    try {
      if (file) {
        templateParams.attachment = await readAsDataUrl(file);
        templateParams.attachment_name = file.name;
        /* sendForm posts the form itself, so the file input carries the attachment
           and the hidden inputs below carry the template parameters. */
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current);
      } else {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
      }

      try {
        window.localStorage.removeItem(DRAFT_KEY);
      } catch (err) {
        /* Nothing to clear if storage is unavailable. */
      }

      setValues(EMPTY_VALUES);
      setErrors({});
      setTouched({});
      setFile(null);
      setFileError('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setStatus('success');
    } catch (err) {
      /* EmailJS reports the real cause on the error object (status + text).
         Swallowing it made an expired OAuth token look identical to a network
         blip, so surface it for diagnosis instead of discarding it. */
      const detail = err && (err.text || err.message || String(err));
      const status = err && err.status;
      console.error('[ContactForm] EmailJS send failed', status ? `(${status})` : '', detail);
      setStatus('error');
    }
  };

  const handleOverlayMouseDown = (event) => {
    overlayPressed.current = event.target === event.currentTarget;
  };

  const handleOverlayClick = (event) => {
    const shouldClose = overlayPressed.current && event.target === event.currentTarget;
    overlayPressed.current = false;
    if (shouldClose) requestClose();
  };

  const describedBy = (name, hasHint) => {
    if (errors[name] && touched[name]) return `${uid}-${name}-error`;
    return hasHint ? `${uid}-${name}-hint` : undefined;
  };

  const errorFor = (name) => (touched[name] ? errors[name] || '' : '');

  const submitting = status === 'submitting';
  const titleId = `${uid}-title`;

  const success = (
    <div className="form-success" role="status">
      <span className="form-success__mark" aria-hidden="true" />
      <h3 className="h3 hi">Message sent</h3>
      <p className="body muted">
        Thanks — it landed. You will get a reply within one business day. If something changes in the meantime, email{' '}
        <a className="link-underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>{' '}
        directly.
      </p>
      {isModal ? (
        <button type="button" className="btn btn--ghost" onClick={requestClose}>
          Close
        </button>
      ) : (
        <button type="button" className="btn btn--ghost" onClick={resetForm}>
          Send another message
        </button>
      )}
    </div>
  );

  const form = (
    <form
      ref={formRef}
      className="form-shell"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      noValidate
    >
      <input type="hidden" name="from_name" value={values.name.trim()} readOnly />
      <input type="hidden" name="from_email" value={values.email.trim()} readOnly />
      <input type="hidden" name="to_email" value={CONTACT_EMAIL} readOnly />
      <input type="hidden" name="reply_to" value={values.email.trim()} readOnly />
      <input type="hidden" name="subject" value={subject} readOnly />
      <input type="hidden" name="message" value={message} readOnly />
      <input type="hidden" name="attachment_name" value={file ? file.name : ''} readOnly />

      <div className="form-grid">
        <Field id={`${uid}-name`} label="Name" required error={errorFor('name')}>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            className="field__control"
            autoComplete="name"
            required
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={registerControl('name')}
            aria-invalid={errorFor('name') ? 'true' : undefined}
            aria-describedby={describedBy('name', false)}
          />
        </Field>

        <Field id={`${uid}-email`} label="Email" required error={errorFor('email')}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            className="field__control"
            autoComplete="email"
            required
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={registerControl('email')}
            aria-invalid={errorFor('email') ? 'true' : undefined}
            aria-describedby={describedBy('email', false)}
          />
        </Field>

        <Field id={`${uid}-company`} label="Company" error={errorFor('company')}>
          <input
            id={`${uid}-company`}
            name="company"
            type="text"
            className="field__control"
            autoComplete="organization"
            value={values.company}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={registerControl('company')}
            aria-describedby={describedBy('company', false)}
          />
        </Field>

        <Field
          id={`${uid}-phone`}
          label="Phone"
          hint="Optional."
          error={errorFor('phone')}
        >
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            className="field__control"
            autoComplete="tel"
            placeholder="(555) 123-4567"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={registerControl('phone')}
            aria-invalid={errorFor('phone') ? 'true' : undefined}
            aria-describedby={describedBy('phone', true)}
          />
        </Field>

        <Field id={`${uid}-companySize`} label="Company size" error={errorFor('companySize')}>
          <select
            id={`${uid}-companySize`}
            name="companySize"
            className="field__control"
            value={values.companySize}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={registerControl('companySize')}
          >
            <option value="">Select company size</option>
            {COMPANY_SIZES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${uid}-projectType`} label="Project type" error={errorFor('projectType')}>
          <select
            id={`${uid}-projectType`}
            name="projectType"
            className="field__control"
            value={values.projectType}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={registerControl('projectType')}
          >
            <option value="">Select project type</option>
            {PROJECT_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${uid}-timeline`} label="Timeline" error={errorFor('timeline')}>
          <select
            id={`${uid}-timeline`}
            name="timeline"
            className="field__control"
            value={values.timeline}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={registerControl('timeline')}
          >
            <option value="">Select timeline</option>
            {TIMELINES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id={`${uid}-attachment`}
          label="Attachment"
          hint="Optional. One file, up to 5 MB."
          error={fileError}
        >
          <input
            id={`${uid}-attachment`}
            name="attachment"
            type="file"
            className="field__control"
            onChange={handleFileChange}
            ref={fileInputRef}
            aria-invalid={fileError ? 'true' : undefined}
            aria-describedby={fileError ? `${uid}-attachment-error` : `${uid}-attachment-hint`}
          />
        </Field>

        <Field
          id={`${uid}-details`}
          label="What are you trying to build?"
          required
          full
          error={errorFor('details')}
        >
          <textarea
            id={`${uid}-details`}
            name="details"
            className="field__control"
            rows={6}
            required
            value={values.details}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={registerControl('details')}
            aria-invalid={errorFor('details') ? 'true' : undefined}
            aria-describedby={describedBy('details', false)}
          />
        </Field>
      </div>

      {status === 'error' ? (
        <p className="form-status form-status--error" role="alert">
          That did not send. Try again in a moment, or email{' '}
          <a className="link-underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>{' '}
          directly and it will reach me either way.
        </p>
      ) : null}

      {submitting ? <div className="form-progress" aria-hidden="true" /> : null}

      <div className="form-actions">
        <button type="submit" className="btn btn--primary btn--lg" disabled={submitting}>
          {submitting ? 'Sending' : 'Send inquiry'}
        </button>
        <a className="link-underline" href={`mailto:${CONTACT_EMAIL}`}>
          Or email {CONTACT_EMAIL} directly
        </a>
      </div>
    </form>
  );

  const content = status === 'success' ? success : form;

  if (embedded) return content;
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onMouseDown={handleOverlayMouseDown} onClick={handleOverlayClick}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={modalRef} tabIndex={-1}>
        <div className="modal__head">
          <h2 className="modal__title" id={titleId}>
            Start a project
          </h2>
          <button type="button" className="modal__close" onClick={requestClose} aria-label="Close dialog">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path
                d="M2 2 L14 14 M14 2 L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
        <div className="modal__body">{content}</div>
      </div>
    </div>
  );
};

export default ContactForm;
