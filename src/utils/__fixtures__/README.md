# Test fixtures

`SimpleMacro.xlsm` is test data from the [Apache POI](https://poi.apache.org/)
project (`test-data/spreadsheet/SimpleMacro.xlsm`), used here under the
Apache License 2.0.

It is vendored rather than generated because the VBA path is only worth
testing against a file Excel actually wrote: a hand-built compound file
would exercise the parser's assumptions instead of the format's reality.
It is 13KB and contains one trivial macro.
