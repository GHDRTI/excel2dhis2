select
/* Type of Survey */
event."qcMpoQLZd3R" as "Survey Type",
/* If TAS, name of evaluation unit */
event."yRD8X6s3RIl" as "if TAS, name of evaluation unit",
/* Administrative Unit */
subdistrict.name,
/* Mapping Survey Site */
event."jjMm5ztUHRt" as "if Mapping, name of survey site",
/* Date of Survey Month (this will be the event date)
'survey month' as "Date of Survey Month"
*/
/* Date of PC Round */
event."F6caxXdwxGE" as "Date of PC Round",
/* Number of Rounds delievered prior to survey */
event."NXAPi3GAgy8" as "Number of Rounds delievered prior to survey",
/* Diagnostic Test */
event."mKhtPGAu5au" as "Diagnostic Test",
/* Age group surveyed */
event."k9kGsFYBW8k" as "Age group surveyed - Min",
event."ZG19yDY5bOx" as "Age group surveyed - Max",
/* Survey Site */
event."nEMlQUejCY9" as "Survey Site",
/* Survey Type */
event."lRmO4No82Xy" as "Survey Type",
/* Target Sample Size */
event."DQaYLGxaz3m" as "Target Sample Size",
/* Number of People Examined */
event."TGqq2wq3OdR" as "Number of People Examined",
/* Number of People Positive */
event."u3BrPVbUfoo" as "Number of People Positive",
/* Percent Positive - Not too sure what to do here */
/* Number of Invalid Tests */
event."llXJ84PBRs2" as "Number of Invalid Tests",
/* Decision */
event."gOmJy2KFZXk" as "LF Decision",
/* Total number of patients - Lymphoedema */
event."fTf2oGZ5pbw" as "Total number of patients - Lymphoedema",
/* Method of patient estimation - Lymphoedema */
event."HImcMSzImBr" as "Method of patient estimation - Lymphoedema",
/* Date of patient estimation - Lymphoedema */
event."DFz7sjc3LDJ" as "Date of patient estimation - Lymphoedema",
/* Number of health facilities providing service - Lymphoedema */
event."YWyo6qEk03E" as "Number of health facilities providing service - Lymphoedema",
/* Total number of patients - Hydrocoele */
event."PwAEvQDSQY0" as "Total number of patients - Hydrocoele",
/* Method of patient estimation - Hydrocoele */
event."RgAcOvzeVf8" as "Method of patient estimation - Hydrocoele",
/* Date of patient estimation - Hydrocoele */
event."ORR19WSl02S" as "Date of patient estimation - Hydrocoele",
/* Number of health facilities providing service - Hydrocoele */
event."zxUd6YGRjvB" as "Number of health facilities providing service - Hydrocoele"



from organisationunit region
join organisationunit district on region.organisationunitid = district.parentid
join organisationunit subdistrict on district.organisationunitid = subdistrict.parentid
left outer join organisationunitattributevalues on organisationunitattributevalues.organisationunitid = subdistrict.organisationunitid
left outer join attributevalue geoconnect_id on geoconnect_id.attributevalueid = organisationunitattributevalues.attributevalueid
left outer join attribute geoconnect_id_attribute on geoconnect_id_attribute.attributeid = geoconnect_id.attributeid
left outer join analytics_event_2016_tvvpo84nyzp event on event.ou = subdistrict.uid



