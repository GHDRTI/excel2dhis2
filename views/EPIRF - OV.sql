SELECT
/* Type of Survey */
event."C1Ikycyfqtt" as "Survey Type",
/* Admin Level 1 */
region.name as "Region",
/* Admin Level 2 */
subdistrict.name as "Woreda",
/* Community Surveyed */
event."tl21UTwsz7m" as "Survey Type"
/* "Date of survey */
/* Date of the first PC round */
/* Treatment strategy */
/* Pre-control prevalence (%) */
/* Number of rounds of PC delivered prior to survey */
/* "Method of diagnostic for skin snip" */
/* Number of people examined */
/* "Age group surveyed (Min - Max)" */
/* Number of people positive */
/* CMFL */
/* "Diagnostic for serology" */
/* Sampling method - Serology */
/* Number of people examined - Serology */
/* "Age group surveyed (Min - Max)" - Serology */
/* Number of people positive - Serology */
/* % positive - Serology */
/* Number of black flies examined */
/* Species of the vector */
/* "poolscreen positive" */
/* Number of crabs examined */
/* Species of the vector */
/* "% mf positive" */
/* Programmatic decision  */

FROM organisationunit region

JOIN organisationunit district
         ON region.organisationunitid = district.parentid
JOIN organisationunit subdistrict
         ON district.organisationunitid = subdistrict.parentid
LEFT OUTER JOIN organisationunitattributevalues
         ON organisationunitattributevalues.organisationunitid = subdistrict.organisationunitid
LEFT OUTER JOIN attributevalue geoconnect_id
         ON geoconnect_id.attributevalueid = organisationunitattributevalues.attributevalueid
LEFT OUTER JOIN attribute geoconnect_id_attribute
         ON geoconnect_id_attribute.attributeid = geoconnect_id.attributeid
LEFT OUTER JOIN analytics_event_2016_muvgdjvpzy4 event
         ON event.ou = subdistrict.uid



