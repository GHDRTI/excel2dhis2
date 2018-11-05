module.exports = function(_params) {

  let moment = require('moment');

  let params = Object.assign({
    period: null,
    orgUnits: null,
    orgTree: null,
    orgUnit: 'iuGjpnxnFbI'
  }, _params);

  var def = {
    params: params,

    sheets: [

      // Intro sheet
      {
        names: [/LF/],
        cells: [
          {
            column: 'G',
            row: '5',
            dataElement: 'total-num-ius',
            orgUnit: params.orgUnit,
            period: params.period,
            mapping: function(value) {
              return value;
            }
          }
        ]
      },
      // Known Patients
      {
        names: [/LF/],
        cells: [
          {
            column: 'H',
            row: '6',
            dataElement: 'num-ius-known-patients',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "lh-lymphoedema",
            period: params.period,
            mapping: function(value) {
              return value;
            }
          }
        ]
      },
      {
        names: [/LF/],
        cells: [
          {
            column: 'I',
            row: '6',
            dataElement: 'num-ius-known-patients',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "lh-hydrocele",
            period: params.period,
            mapping: function(value) {
              return value;
            }
          }
        ]
      },
      // No Known Patients
      {
        names: [/LF/],
        cells: [
          {
            column: 'H',
            row: '7',
            dataElement: 'num-ius-no-known-patients',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "lh-lymphoedema",
            period: params.period,
            mapping: function(value) {
              return value;
            }
          }
        ]
      },
      {
        names: [/LF/],
        cells: [
          {
            column: 'I',
            row: '7',
            dataElement: 'num-ius-no-known-patients',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "lh-hydrocele",
            period: params.period,
            mapping: function(value) {
              return value;
            }
          }
        ]
      },
      // Patient Estimate Pending
      {
        names: [/LF/],
        cells: [
          {
            column: 'H',
            row: '8',
            dataElement: 'patients-estimate-pending',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "lh-lymphoedema",
            period: params.period,
            mapping: function(value) {
              return value;
            }
          }
        ]
      },
       {
        names: [/LF/],
        cells: [
          {
            column: 'I',
            row: '8',
            dataElement: 'patients-estimate-pending',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "lh-hydrocele",
            period: params.period,
            mapping: function(value) {
              return value;
            }
          }
         ]
      },
      // Number of IUs with at least 1 facility designated 
      // to provide recommended minimum package of care
      {
        names: [/LF/],
        cells: [
          {
            column: 'H',
            row: '9',
            dataElement: 'ius-with-one-faciity-providing-recs',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "lh-lymphoedema",
            period: params.period,
            mapping: function(value) {
              return value;
            }
          }
        ]
      },
       {
        names: [/LF/],
        cells: [
          {
            column: 'I',
            row: '9',
            dataElement: 'ius-with-one-faciity-providing-recs',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "lh-hydrocele",
            period: params.period,
            mapping: function(value) {
              return value;
            }
          }
        ]
      },
      // Total number of designated health facilities providing care
      {
        names: [/LF/],
        cells: [
          {
            column: 'H',
            row: '10',
            dataElement: 'designated-facility-providing-care',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "lh-lymphoedema",
            period: params.period,
            mapping: function(value) {
              return value;
            }
          }
        ]
      },
       {
        names: [/LF/],
        cells: [
          {
            column: 'I',
            row: '10',
            dataElement: 'designated-facility-providing-care',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "lh-hydrocele",
            period: params.period,
            mapping: function(value) {
              return value;
            }
          }
        ]
      },
      // Cumulative number of patients 
      {
        names: [/LF/],
        cells: [
          {
            column: 'H',
            row: '11',
            dataElement: 'cumulative-num-patients',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "lh-lymphoedema",
            period: params.period,
            mapping: function(value) {
              return value;
            }
          }
        ]
      },
      {
        names: [/LF/],
        cells: [
          {
            column: 'I',
            row: '11',
            dataElement: 'cumulative-num-patients',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "lh-hydrocele",
            period: params.period,
            mapping: function(value) {
              return value;
            }
          }
        ]
      },
      // Number of patients who received care in the reporting year
      {
        names: [/LF/],
        cells: [
          {
            column: 'H',
            row: '12',
            dataElement: 'num-patients-received-care-in-reporting-year',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "lh-lymphoedema",
            period: params.period,
            mapping: function(value) {
              return value;
            }
          }
        ]
      },
       {
        names: [/LF/],
        cells: [
          {
            column: 'I',
            row: '12',
            dataElement: 'num-patients-received-care-in-reporting-year',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "lh-hydrocele",
            period: params.period,
            mapping: function(value) {
              return value;
            }
          }
        ]
      }
    ]
  };


  return def;

}