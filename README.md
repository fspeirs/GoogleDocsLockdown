# GoogleDocs Lockdown
Chrome Extension to Secure Google Docs for School Exam Use.

In school exams in Scotland, pupils often use a specially-formatted Word file to complete exams. To use Google Docs for this purpose, a number of requirements would have to be met:

- Spell checking must be able to be disabled for pupils who type but don't require the support of the spell checker
- Grammar checker should be disabled
- No access to external web sites or sources of help should be available (e.g. Define, Explore, Search the Web for Images inside Google Docs)

While some of this can be achieved by the GSuite admin console, many features inside Google Docs cannot be disabled by simple URL blocking or firewalling.

This Chrome extension attempts to solve this problem by modifying the Google Docs DOM to remove the elements that represent the controls for these features. The practical effect of this is that, once set up, there are no controls for the Spell Check settings to be re-enabled.

## Contact

The author of this extension is Fraser Speirs, Head Teacher, [Cedars School of Excellence](http://cedars.inverclyde.sch.uk).

fs@cedars.inverclyde.sch.uk
