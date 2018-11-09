module.exports = function(_params) {

  let params = Object.assign({
    period: null,
    orgUnits: null,
    orgTree: null
  }, _params);

  let ParserUtils = require('./parser-utils.js')(params);

  var def = {
    params: params,
    sheets: [
      {
        names: [/COUNTRY_INFO/],
        startRow: 9,
        row: {
          invariants: {
            period: function(row) {return params.period},
            orgUnit: findOrg
          },
          dataValues: [
            {
              column: "B",
              variable: "provincestate",
              orgUnit: null
            },
            {
              column: "C",
              variable: "district",
              orgUnit: null
            },
            // Population - PreSAC
            {
              column: "E",
              dataElement: "pcn-pop",
              categoryOptionCombo: "age-presac",
              mapping: function(value, row) {
                return Math.round(Number.parseFloat(value));
              }
            },
            // Population - SAC
            {
              column: "F",
              dataElement: "pcn-pop",
              categoryOptionCombo: "age-sac",
              mapping: function(value, row) {
                return Math.round(Number.parseFloat(value));
              }
            },
            // Population - Adults
            {
              column: "G",
              dataElement: "pcn-pop",
              categoryOptionCombo: "age-adult",
              mapping: function(value, row) {
                return Math.round(Number.parseFloat(value));
              }
            },
            
            // Endemicity - LF
            {
              column: "H",
              dataElement: "pcn-endemicity",
              categoryOptionCombo: "pc-ntd-lf",
              mapping: function(value, row) {
                if (value === '0' || value == 0) {
                  return 'non-endemic'
                } else if (value === '1' || value == 1) {
                  return 'endemic'
                } else if (value === '4' || value == 4) {
                  return 'unknown'
                } else if (value === '999' || value == 999) {
                  return 'endemic'
                }
              }
            },
            // Endemicity - Oncho
            {
              column: "I",
              dataElement: "pcn-endemicity",
              categoryOptionCombo: "pc-ntd-ov",
              mapping: function(value, row) {
                if (value === '0' || value == 0) {
                  return 'non-endemic'
                } else if (value === '1' || value == 1) {
                  return 'endemic'
                } else if (value === '4' || value == 4) {
                  return 'unknown'
                } else if (value === '999' || value == 999) {
                  return 'endemic'
                }
              }
            },
            // Endemicity - STH
            {
              column: "J",
              dataElement: "pcn-endemicity",
              categoryOptionCombo: "pc-ntd-sth",
              mapping: function(value, row) {
                if (value === '0' || value == 0) {
                  return 'non-endemic'
                } else if (parseInt(value, 10) >= 1 && parseInt(value, 10) <= 3) {
                  return 'endemic'
                } else if (value === '4' || value == 4) {
                  return 'unknown';
                } else if (value === '5' || value == 5) {
                  return 'endemic'
                }
              }
            },
            // Endemicity - SCH
            {
              column: "K",
              dataElement: "pcn-endemicity",
              categoryOptionCombo: "pc-ntd-sch",
              mapping: function(value, row) {
                if (value === '0' || value == 0) {
                  return 'non-endemic'
                } else if (parseInt(value, 10) >= 1 && parseInt(value, 10) <= 3) {
                  return 'endemic'
                } else if (value === '4' || value == 4) {
                  return 'unknown';
                } else if (value === '5' || value == 5) {
                  return 'endemic'
                }
              }
            },
            // Population Requiring PC - LF
            {
              column: "L",
              dataElement: "pcn-pop-require-pc",
              categoryOptionCombo: "pc-ntd-lf",
            },
            // Population Requiring PC - Oncho
            {
              column: "M",
              dataElement: "pcn-pop-require-pc",
              categoryOptionCombo: "pc-ntd-sch",
            },
            // Population Requiring PC - STH
            {
              column: "N",
              dataElement: "pcn-pop-require-pc",
              categoryOptionCombo: "pc-ntd-sth",
            },
            // Population Requiring PC - SCH
            {
              column: "O",
              dataElement: "pcn-pop-require-pc",
              categoryOptionCombo: "pc-ntd-sch",
            },
            // Number of treatment rounds planned per year - LF
            {
               column: "P",
               dataElement: "pcn-rounds-planned",
               categoryOptionCombo: "pc-ntd-lf",
            },
            // Number of treatment rounds planned per year - Oncho
            {
              column: "Q",
              dataElement: "pcn-rounds-planned",
              categoryOptionCombo: "pc-ntd-ov",
            },
            // Number of treatment rounds planned per year - STH
            {
              column: "R",
              dataElement: "pcn-rounds-planned",
              categoryOptionCombo: "pc-ntd-sth",
            },
            // Number of treatment rounds planned per year - SCH
            {
              column: "S",
              dataElement: "pcn-rounds-planned",
              categoryOptionCombo: "pc-ntd-sch",
            },
            // PC Implemented - Round 1
            {
              column: "T",
              dataElement: "pcn-int-implemented-r1"
            },
            // PC Implemented - Round 2
            {
              column: "U",
              dataElement: "pcn-int-implemented-r2"
            }
          ]
        }
      }
    ]
  }

  function findOrg(row) {
    // Variables:
    //  - provincestate: RegionZone squished together name
    //  - district: Woreda 
    var variables = ParserUtils.getRowVariables(row);
    if (!variables.provincestate || !variables.district) {
      console.log("Missing district info: " + variables.provincestate + 
        "/" + variables.district);
      return null;
    }
    var org = ParserUtils.districtLookupProvinceState(variables.provincestate, variables.district);
    if (!org) {
      org = ParserUtils.districtLookupState(variables.provincestate, variables.district);
    }

    if (!org) {
      console.log("Unable to find district: " + variables.provincestate + 
        "/" + variables.district);
      return null;
    }
    return org.id;
  }


  return def;
}


