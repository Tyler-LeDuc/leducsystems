# Test fixtures

`SimpleMacro.xlsm` is test data from the [Apache POI](https://poi.apache.org/)
project (`test-data/spreadsheet/SimpleMacro.xlsm`), used here under the
Apache License 2.0.

It is vendored rather than generated because the VBA path is only worth
testing against a file Excel actually wrote: a hand-built compound file
would exercise the parser's assumptions instead of the format's reality.
It is 13KB and contains one trivial macro.

`accessQueryTest.mdb` is test data from the [Jackcess](https://jackcess.sourceforge.io/)
project (`src/test/data/V2000/queryTestV2000.mdb`), used here under the
Apache License 2.0.

It is a real Access 2000 database rather than a constructed one, for the same
reason: a hand-built page file would exercise the parser's assumptions rather
than the format's reality. It holds three user tables and nine saved queries,
which is enough to cover the object inventory, the schema read, and the
"queries are business logic nobody looks at" finding.
