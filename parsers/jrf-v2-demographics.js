module.exports = function(_params) {

  let params = Object.assign({
    period: null,
    orgUnits: null,
    orgTree: null
  }, _params);

  var orgTree = params.orgTree;

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
            },
            // Endemicity - Oncho
            {
              column: "I",
              dataElement: "pcn-endemicity",
              categoryOptionCombo: "pc-ntd-ov"
              
            },
            // Endemicity - STH
            {
              column: "J",
              dataElement: "pcn-endemicity",
              categoryOptionCombo: "pc-ntd-sth"
            },
            // Endemicity - SCH
            {
              column: "K",
              dataElement: "pcn-endemicity",
              categoryOptionCombo: "pc-ntd-sch"
              
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
    var variables = getRowVariables(row);
    if (!variables.provincestate || !variables.district) {
      console.log("Missing district info: " + variables.provincestate + 
        "/" + variables.district);
      return null;


    }
    var org = districtLookupProvinceState(variables.provincestate, variables.district);
    if (!org) {
      org = districtLookupState(variables.provincestate, variables.district);
    }


    if (!org) {

       if (province_district != "SNNPR Yem Special Woreda/Yem") {
        console.log("Unable to find district: " + variables.provincestate + 
        "/" + variables.district);

      //console.log(province_district);


      console.log("Unable to find district: " + variables.provincestate + 
        "/" + variables.district);
      return null;
    }
    return org.id;
  }


  function districtLookupProvinceState(provincestate, districtName) {
    //Find Region
    
    

    //console.log("looking for: "+ provincestate);
    var regionRegionName = findChildNamed(orgTree, provincestate, 'start');
    if (!regionRegionName) return null;

    console.log("found " + districtName);


    //Find Zone
    var zone = findChildNamed(regionRegionName[0], provincestate, 'end', 
      regionRegionName[1].length);
    if (!zone) return null;

    //Find District
    return findChildNamed(zone, districtName, null);
  }

  function districtLookupState(stateName, districtName) {
    for (var i = 0; i < orgTree.children.length; i++) {
      var region = orgTree.children[i];
      var zone = findChildNamed(region, stateName);
      if (zone) {
        return findChildNamed(zone, districtName);
      }
    }
  }

  function findChildNamed(node, name, namelocation, offset) {
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      for (var n = 0; n < child.spellings.length; n++) {
        var childName = child.spellings[n].toLowerCase();
        if (namelocation === 'start') {
          if (name.toLowerCase().indexOf(childName) == 0) {
            return [child, childName];
          }
        } else if (namelocation === 'end') {
          if (name.toLowerCase().indexOf(childName, 1) == offset) {
            return child;
          }
        } else {
          if (name.toLowerCase() === childName) {
            return child;
          }
        }
      }
    }
  }


  function getRowVariables(row) {
    var variables = {};
    for (var i = 0; i < row.length; i++) {
      if (row[i].variable) variables[row[i].variable] = row[i].value;
    }
    return variables;
  }


  // Org to flat geoconnect mapping
  // {"geoconnectId": {
  //   id: "ORG00000000",
  //   name: "Name",
  //   spellings: ["Name", "Name1", "Name2"],
  //   geoconnectId: "AAAAAAA"
  // },...}
  function orgsToGeoconnectLookup(orgUnits) {
    var lookup = {};
    for (var i = 0; i < orgUnits.length; i++) {
      var orgUnit = orgUnits[i];
      var geoAttr = getOrgAttribute(orgUnit, params['geoconnectAttributeID']);
      if (geoAttr && geoAttr.value) {
        lookup[geoAttr.value] = {
          id: orgUnit.id,
          name: orgUnit.name,
          //spellings: orgNames(orgUnit),
          path: orgUnit.path
        }
      }
    }
    return lookup;
  }
  function getOrgAttribute(orgUnit, attributeId) {
    if (orgUnit.attributeValues) {
      for (var a = 0; a < orgUnit.attributeValues.length; a++) {
        var av = orgUnit.attributeValues[a]
        if (av['attribute']['id'] == attributeId) {
          return av;
        }
      }
    }
  }

  return def;
}


