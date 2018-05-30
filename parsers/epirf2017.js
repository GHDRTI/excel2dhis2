module.exports = function(_params) {

  let moment = require('moment');

  let params = Object.assign({
    period: null,
    orgUnits: null,
    orgTree: null,
    geoconnectAttributeID: 'rct9QrdQEnz',
    spellingsAttributeID: 'U4FWYMGCWju',
    lfProgram: "TBJMLbC2QM1",
    lfProgramStage: "jrgpfrJKSW0",
    onchoProgram: "IqggTrnKS7z",
    onchoProgramStage: "f1QqINpgrcR",
    rootOrgName: 'Ethiopia',
    attributeOptionCombo: "HllvX50cXC0",
    attributeCategoryOptions: "xYerKDKCefk"
  }, _params);

  var def = {
    params: params,

    sheets: [

      // LF Sheet
      {
        names: [/LF/],
        startRow: 17,
        params: params,
        row: {
          event: {
            event: function(row) {
              var district = getRowVariables(row)['district'];
              if (!district) district = "0"
              var date = getRowDataElements(row)['nciytFVbQol'];
              if (!date) {
                date = moment(new Date(params.period,0,1)).format('YYYY-MM-DD');
              }
              return params.lfProgram + "-" + district.id + "-" + date;
            },
            program: params.lfProgram,
            programStage: params.lfProgramStage,
            attributeOptionCombo: params.attributeOptionCombo,
            attributeCategoryOptions: params.attributeCategoryOptions,
            status: "COMPLETED",
            eventDate: function(row) {
              var date = getRowDataElements(row)['nciytFVbQol'];
              if (!date) {
                return moment(new Date(params.period,0,1)).format('YYYY-MM-DD');
              } else {
                return date;
              }
            },
            orgUnit: function(row) {
              var district = getRowVariables(row)['district'];
              if (district) return district.id;
            },
            orgUnitName: function(row) {
              var district = getRowVariables(row)['district'];
              if (district) return district.name;
            },
            coordinate: function(row) {
              var lat = getRowVariables(row)['latitude'];
              var lon = getRowVariables(row)['longitude'];
              if (lat && lon) {
                return {
                  latitude: lat,
                  longitude: lon
                }
              }
            },
            notes: function(row) {
              var comments = getRowVariables(row)['comments'];
              if (comments) {
                return [{value: comments}]
              }
            },
          },
          invariants: {

          },
          dataValues: [
            // Type of survey
            {
              column: "A",
              dataElement: "GY0DIuqIei9",
              mapping: function(value, row) {
                if (value == "Mapping") {
                  return "mapping";
                } else if (value == "Sentinel site") {
                  return "sentinel_site";
                } else if (value == "Spot check") {
                  return "spot_check";
                } else if (value == "TAS1") {
                  return "tas1";
                } else if (value == "Repeated TAS1") {
                  return "tas1_repeated";
                } else if (value == "TAS2") {
                  return "tas2";
                } else if (value == "TAS3") {
                  return "tas3";
                } else if (value == "Clinical case estimation") {
                  return "cce";
                }
              }
            },
            // Name of survey site
            {
              column: "B",
              dataElement: "imuAHltsaov",
            },
            // Name of administrative (implementation) unit
            {
              column: "C",
              variable: "district",
              mapping: function(value, row) {
                return getDistrict(value);
              }
            },
            // Date of Survey
            {
              column: "E",
              dataElement: "nciytFVbQol",
              mapping: function(value, row) {
                var d = moment(value, 'MMMM YYYY');
                if (!d) d = moment(value + ' ' + params.period, 'MMMM YYYY' );
                return d.format('YYYY-MM-DD');
              }
            },
            // Latitude
            { 
              column: "F",
              variable: "latitude"
            },
            // Longitude
            { 
              column: "G",
              variable: "longitude"
            },
            // Date of the first PC round
            {
              column: "H",
              dataElement: "gz4hHQXzVS0",
              mapping: function(value, row) {
                if (value) {
                  return moment(value).format('YYYY-MM-DD');
                }
              }
            },
            // Number of rounds of PC delivered prior to survey
            {
              column: "I",
              dataElement: "P9iRMnvQu08",
              mapping: function(value, row) {
                if (value) {
                  return parseInt(value, 10);
                }
              }
            },
            // Diagnostic Test
            {
              column: "J",
              dataElement: "oKD5iLYEkCN",
              mapping: function(value, row) {
                if (value === "Blood film/counting chamber (mf)") {
                  return "bf_cc_mf";
                } else if (value === "FTS (Ag)") {
                  return "fts_ag";
                } else if (value === "ICT (Ag)") {
                  return "ict_ag";
                } else if (value === "Brugia Rapid (Ab)") {
                  return "brugia";
                } else if (value === "FTS/ICT + Brugia Rapid") {
                  return "ict_brugia";
                } else if (value === "Other") {
                  return "other";
                }
              }
            },
            // Age - Minimum
            {
              column: "K",
              dataElement: "E0ZexaeMoAo",
              mapping: function(value, row) {
                var match = /(\d{2})(\d{2})/.exec(value);
                if (match && match[1]) return parseInt(match[1],10)
              }
            },
            // Age - Maximum
            {
              column: "K",
              dataElement: "WlMTnbyM2WB",
              mapping: function(value, row) {
                var match = /(\d{2})(\d{2})/.exec(value);
                if (match && match[2]) return parseInt(match[2],10)
              }
            },
            // Survey Site 
            {
              column: "L",
              dataElement: "JGWdINJrLak",
              mapping: function(value, row) {
                if (value === "School") {
                  return "school";
                } else if (value === "Community") {
                  return "community";
                }
              }
            },
            // Survey Type 
            {
              column: "M",
              dataElement: "KEVPtXXyHQV",
              mapping: function(value, row) {
                if (value === "Cluster") {
                  return "cluster";
                } else if (value === "Systematic") {
                  return "systematic";
                } else if (value === "Census") {
                  return "census";
                } else if (value === "Convenience") {
                  return "convenience";
                }
              }
            },
            // Target sample size
            {
              column: "N",
              dataElement: "gBS9GWku36T",
              mapping: function(value, row) {
                if (value) return parseInt(value, 10);
              }
            },
            // Number of people examined
            {
              column: "O",
              dataElement: "fSwd2C6xiqW",
              mapping: function(value, row) {
                if (value) return parseInt(value, 10);
              }
            },
            // Number of people positive
            {
              column: "P",
              dataElement: "SwiTL6UfvVv",
              mapping: function(value, row) {
                if (value) return parseInt(value, 10);
              }
            },
            // Number of invalid tests
            {
              column: "R",
              dataElement: "tIjR1abWHwk",
              mapping: function(value, row) {
                if (value) return parseInt(value, 10);
              }
            },
            // LF Decision
            {
              column: "S",
              dataElement: "Ru9qu8oDDdb",
              mapping: function(value, row) {
                if (value === "Start PC") {
                  return "start_pc";
                } else if (value === "Continue PC") {
                  return "continue_pc";
                } else if (value === "Stop PC") {
                  return "stop_pc";
                } else if (value === "Restart PC") {
                  return "restart_pc";
                } else if (value === "Continue surveillance") {
                  return "continue_surveillance";
                }
              }
            },
            // LF - Number of Patients (Lymphoedema)
            {
              column: "T",
              dataElement: "P57ddvXSAOa",
              mapping: function(value, row) {
                if (value) return parseInt(value, 10);
              }
            },
            // LF - Method of Patient Estimation (Lymphoedema)
            {
              column: "U",
              dataElement: "udPN6puZqbt",
              mapping: function(value, row) {
                return value;
              }
            },
            // LF - Date of Patient Estimation (Lymphoedema) 
            {
              column: "V",
              dataElement: "ZbBcICa2ZFL",
              mapping: function(value, row) {
                if (value) {
                  var matches = value.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/);
                  if (matches && matches.length > 0) {
                    return moment(matches[0],'MM-DD-YYYY').format('YYYY-MM-DD');
                  }
                }
              }
            },
            // LF - Number of Health Facilities (Lymphoedema) 
            {
              column: "W",
              dataElement: "C6kJXQ965vc",
              mapping: function(value, row) {
                return value;
              }
            },
            // LF - Number of Patients (Hydrocele)
            {
              column: "X",
              dataElement: "BdGNHpuJ5rj",
              mapping: function(value, row) {
                if (value) return parseInt(value, 10);
              }
            },
            // LF - Method of Patient Estimation (Lymphoedema)
            {
              column: "Y",
              dataElement: "rtCyuvva9LX",
              mapping: function(value, row) {
                return value;
              }
            },
            // LF - Date of Patient Estimation (Lymphoedema) 
            {
              column: "Z",
              dataElement: "fsru6N01Tur",
              mapping: function(value, row) {
                if (value) {
                  var matches = value.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/);
                  if (matches && matches.length > 0) {
                    return moment(matches[0],'MM-DD-YYYY').format('YYYY-MM-DD');
                  }
                }
              }
            },
            // LF - Number of Health Facilities (Lymphoedema) 
            {
              column: "AA",
              dataElement: "qGExiSa3EMS",
              mapping: function(value, row) {
                return value;
              }
            },
            // Comments
            { 
              column: "AB",
              variable: "comments"
            }
          ]
        }
      },

      // Oncho Sheet
      {
        names: [/ONCHO/],
        startRow: 8,
        params: params,
        row: {
          event: {
            event: function(row) {
              var district = getRowVariables(row)['district'];
              if (!district) district = "0"
              var date = getRowVariables(row)['dateOfSurvey'];
              if (!date) {
                date = moment(new Date(params.period,0,1)).format('YYYY-MM-DD');
              }
              return params.onchoProgram + "-" + district.id + "-" + date;
            },
            program: params.onchoProgram,
            programStage: params.onchoProgramStage,
            attributeOptionCombo: params.attributeOptionCombo,
            attributeCategoryOptions: params.attributeCategoryOptions,
            status: "COMPLETED",
            eventDate: function(row) {
              var date = getRowVariables(row)['dateOfSurvey'];
              if (!date) {
                return moment(new Date(params.period,0,1)).format('YYYY-MM-DD');
              } else {
                return date;
              }
            },
            orgUnit: function(row) {
              var district = getRowVariables(row)['district'];
              if (district) return district.id;
            },
            orgUnitName: function(row) {
              var district = getRowVariables(row)['district'];
              if (district) return district.name;
            },
            coordinate: function(row) {
              var lat = getRowVariables(row)['latitude'];
              var lon = getRowVariables(row)['longitude'];
              if (lat && lon) {
                return {
                  latitude: lat,
                  longitude: lon
                }
              }
            },
            notes: function(row) {
              var comments = getRowVariables(row)['comments'];
              if (comments) {
                return [{value: comments}]
              }
            },
          },
          invariants: {

          },
          dataValues: [
            // Type of survey
            {
              column: "A",
              dataElement: "OCB7xrl5og0",
              mapping: function(value, row) {
                if (value === "Mapping") {
                  return "mapping";
                } else if (value === "Phase 1A") {
                  return "phase1a";
                } else if (value === "Phase 1B") {
                  return "phase1b";
                } else if (value === "PTS") {
                  return "pts";
                }
              }
            },
            // Admin Level 1
            {
              column: "B",
              variable: "regionName",
              mapping: function(value, row) {
                return value
              }
            },
            // Admin Level 2
            {
              column: "C",
              variable: "district",
              mapping: function(value, row) {
                return getDistrict(value);
              }
            },
            // Community Surveyed 
            {
              column: "D",
              dataElement: "a2nbxmFN7I3",
            },
            // Date of survey
            {
              column: "E",
              variable: "dateOfSurvey",
              mapping: function(value, row) {
                var d = moment(value, 'MMMM YYYY');
                if (!d) d = moment(value + ' ' + params.period, 'MMMM YYYY' );
                return d.format('YYYY-MM-DD');
              }
            },
            // Latitude
            { 
              column: "F",
              variable: "latitude"
            },
            // Longitude
            { 
              column: "G",
              variable: "longitude"
            },
            // Date of First PC Round
            {
              column: "H",
              dataElement: "gz4hHQXzVS0",
              mapping: function(value, row) {
                if (value) {
                  return moment(value, 'YYYY').format('YYYY-MM-DD');
                }
              }
            },
            // Treatment Strategy
            {
              column: "I",
              dataElement: "oqNUs0mZrq8",
              mapping: function(value, row) {
                if (value === "Annual") {
                  return "annual";
                } else if (value === "Semi-annual") {
                  return "semi_annual";
                }
              }
            },
            // Pre-control prevalence
            {
              column: "J",
              dataElement: "I1b1mzCkfHq",
              mapping: function(value, row) {
                return value;
              }
            },
            // Rounds delivered p. to survey
            {
              column: "K",
              dataElement: "P9iRMnvQu08",
              mapping: function(value, row) {
                if (value) return parseInt(value, 10);
              }
            },

            // MF Skin Snip
            // Diagnostic Method
            {
              column: "L",
              dataElement: "cg0paY8on36",
              mapping: function(value, row) {
                if (value === "Microscopy") {
                  return "microscopy";
                } else if (value === "PCR") {
                  return "pcr";
                }
              }
            },
            // Number People Examined
            {
              column: "M",
              dataElement: "mLCVHr0rhni",
              mapping: function(value, row) {
                if (value) return parseInt(value, 10);
              }
            },
            // Min Age
            {
              column: "N",
              dataElement: "icN4AkulJGC",
              mapping: function(value, row) {
                var match = /(\d{2})(\d{2})/.exec(value);
                if (match && match[1]) return parseInt(match[1],10)
              }
            },
            // Max Age
            {
              column: "N",
              dataElement: "PljKluU3jfw",
              mapping: function(value, row) {
                var match = /(\d{2})(\d{2})/.exec(value);
                if (match && match[2]) return parseInt(match[2],10)
              }
            },
            // Number People Positive
            {
              column: "O",
              dataElement: "Eviv4dwEmAM",
              mapping: function(value, row) {
                if (value) return parseInt(value, 10);
              }
            },
            // CMFL
            {
              column: "Q",
              dataElement: "TTQweaIKeoF"
            },

            // Serology
            // Diagnostic Method
            {
              column: "R",
              dataElement: "v88aw43TrCe",
              mapping: function(value, row) {
                if (value === "RDT") {
                  return "rdt";
                } else if (value === "ELISA") {
                  return "elisa";
                }
              }
            },
            // Sampling Method
            {
              column: "S",
              dataElement: "KfkfNfxq18n",
              mapping: function(value, row) {
                if (value === "Cluster") {
                  return "cluster";
                } else if (value === "Systematic") {
                  return "systematic";
                } else if (value === "Convenience") {
                  return "convenience";
                }
              }
            },
            // Number People Examined
            {
              column: "T",
              dataElement: "w4i03vkP8bP",
              mapping: function(value, row) {
                if (value) return parseInt(value, 10);
              }
            },
            // Min Age
            {
              column: "U",
              dataElement: "oHQS85o8Fju",
              mapping: function(value, row) {
                var match = /(\d{2})(\d{2})/.exec(value);
                if (match[1]) return parseInt(match[1],10)
              }
            },
            // Max Age
            {
              column: "U",
              dataElement: "KrRyIHEklhu",
              mapping: function(value, row) {
                var match = /(\d{2})(\d{2})/.exec(value);
                if (match[2]) return parseInt(match[2],10)
              }
            },
            // Number People Positive
            {
              column: "V",
              dataElement: "Nx9AA4QYa8K",
              mapping: function(value, row) {
                if (value) return parseInt(value, 10);
              }
            },

            // PCR in black flies
            // # Flies Examined
            {
              column: "X",
              dataElement: "RWt5suL4HyS",
              mapping: function(value, row) {
                if (value) return parseInt(value, 10);
              }
            },
            // Species of vector
            {
              column: "Y",
              dataElement: "CLMHpu1T3s1"
            },
            // % Poolscreen positive
            {
              column: "Z",
              dataElement: "iAJgdhzlboL",
              mapping: function(value, row) {
                if (value) return parseFloat(value);
              }
            },

            // Crabs
            // # Crabs Examined
            {
              column: "AA",
              dataElement: "SyjrMOaIx5f",
              mapping: function(value, row) {
                if (value) return parseInt(value, 10);
              }
            },
            // Species of vector
            {
              column: "AB",
              dataElement: "KZleAN2NyHB"
            },
            // % MF positive
            {
              column: "AC",
              dataElement: "zaGCXSvfUUn",
              mapping: function(value, row) {
                if (value) return parseFloat(value);
              }
            },
            // Programmatic decision
            { 
              column: "AD",
              dataElement: "sG6crE6N2fY",
              mapping: function(value, row) {
                if (value === "Continue MDA") {
                  return "continue_mda";
                } else if (value === "Change MDA Strategy") {
                  return "change_mda_strategy";
                } else if (value === "Stop MDA") {
                  return "stop_mda";
                }
              }
            }
          ]
        }
      }
    ]
  };


  function getRowVariables(row) {
    var variables = {};
    for (var i = 0; i < row.length; i++) {
      if (row[i].variable) variables[row[i].variable] = row[i].value;
    }
    return variables;
  }

  function getRowDataElements(row) {
    var elements = {};
    for (var i = 0; i < row.length; i++) {
      if (row[i].dataElement) elements[row[i].dataElement] = row[i].value;
    }
    return elements;
  }

  function getDistrict(districtName) {
    for (var r = 0; r < params.orgTree.children.length; r++) {
      var region = params.orgTree.children[r];
      for (var z = 0; z < region.children.length; z++) {
        var zone = region.children[z];
        for (var w = 0; w < zone.children.length; w++) {
          var woreda = zone.children[w];
          for (var s = 0; s < woreda.spellings.length; s++) {
            if (woreda.spellings[s].toLowerCase().trim() === districtName.toLowerCase().trim()) {
              return woreda;
            }
          }
        }
      }
    }
    console.log("Unable to find district named '" + districtName + "'");
  }

  return def;

}