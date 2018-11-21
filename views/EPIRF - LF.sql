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
'Number of Rounds delievered prior to survey' as "Number of Rounds delievered prior to survey",
/* Diagnostic Test */
'Diagnostic Test' as "Diagnostic Test",
/* Age group surveyed */
'Age group surveyed' as "Age group surveyed"

from organisationunit region
join organisationunit district on region.organisationunitid = district.parentid
join organisationunit subdistrict on district.organisationunitid = subdistrict.parentid
left outer join organisationunitattributevalues on organisationunitattributevalues.organisationunitid = subdistrict.organisationunitid
left outer join attributevalue geoconnect_id on geoconnect_id.attributevalueid = organisationunitattributevalues.attributevalueid
left outer join attribute geoconnect_id_attribute on geoconnect_id_attribute.attributeid = geoconnect_id.attributeid
left outer join analytics_event_2016_tvvpo84nyzp event on event.ou = subdistrict.uid



