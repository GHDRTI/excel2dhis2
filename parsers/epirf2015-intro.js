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
        names: [/INTRO/],
        cells: [
          {
            column: 'E',
            row: '36',
            dataElement: 'pcn-endemicity',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "pc-ntd-lf",
            period: params.period,
            mapping: function(value) {
              if (value == "Endemic") {
                  return "endemic";
                } else if (value == "Endemic but PC is not required") {
                  return "endemic-pc-not-required";
                } else if (value == "Non-endemic") {
                  return "non-endemic";
                }
            }
          }
        ]
      },
      {
        names: [/INTRO/],
        cells: [
          {
            column: 'E',
            row: '38',
            dataElement: 'pcn-endemicity',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "pc-ntd-ov",
            period: params.period,
            mapping: function(value) {
              if (value == "Endemic") {
                  return "endemic";
                } else if (value == "Endemic but PC is not required") {
                  return "endemic-pc-not-required";
                } else if (value == "Non-endemic") {
                  return "non-endemic";
                }
            }
          }
        ]
      },
      {
        names: [/INTRO/],
        cells: [
          {
            column: 'E',
            row: '40',
            dataElement: 'pcn-endemicity',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "pc-ntd-sch",
            period: params.period,
            mapping: function(value) {
              if (value == "Endemic") {
                  return "endemic";
                } else if (value == "Endemic but PC is not required") {
                  return "endemic-pc-not-required";
                } else if (value == "Non-endemic") {
                  return "non-endemic";
                }
            }
          }
        ]
      },
      {
        names: [/INTRO/],
        cells: [
          {
            column: 'E',
            row: '42',
            dataElement: 'pcn-endemicity',
            orgUnit: params.orgUnit,
            categoryOptionCombo: "pc-ntd-sth",
            period: params.period,
            mapping: function(value) {
              if (value == "Endemic") {
                  return "endemic";
                } else if (value == "Endemic but PC is not required") {
                  return "endemic-pc-not-required";
                } else if (value == "Non-endemic") {
                  return "non-endemic";
                }
            }
          }
        ]
      },
    ]
  };


  return def;

}