-- Retain historical v2 responses and accept the current shared questionnaire version.
-- No response, contact, consent, retention, RLS, or grant changes.
begin;
alter table research_private.survey_responses
  drop constraint survey_responses_survey_version_check;
alter table research_private.survey_responses
  add constraint survey_responses_survey_version_check
  check (survey_version in ('padel-surveys-v2', 'padel-surveys-v4'));
commit;
