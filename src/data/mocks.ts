// Mock data fallbacks for when live APIs are unreachable

export const MOCK_LAUNCHES = [
  {
    id: "mock-1",
    name: "Starlink Group 7-1",
    net: "2025-10-15T14:30:00Z",
    launch_service_provider: { name: "SpaceX" },
    rocket: { configuration: { name: "Falcon 9 Block 5", family: "Falcon" } },
    pad: { name: "SLC-40", location: { name: "Cape Canaveral SFS, FL, USA", country_code: "USA" } }
  },
  {
    id: "mock-2",
    name: "Crew-8 Return",
    net: "2025-10-16T09:15:00Z",
    launch_service_provider: { name: "SpaceX" },
    rocket: { configuration: { name: "Dragon 2", family: "Dragon" } },
    pad: { name: "ISS", location: { name: "Low Earth Orbit", country_code: "INT" } }
  },
  {
    id: "mock-3",
    name: "Artemis III",
    net: "2025-10-18T12:00:00Z",
    launch_service_provider: { name: "NASA" },
    rocket: { configuration: { name: "SLS Block 1B", family: "Space Launch System" } },
    pad: { name: "LC-39B", location: { name: "Kennedy Space Center, FL, USA", country_code: "USA" } }
  },
  {
    id: "mock-4",
    name: "OneWeb Launch #22",
    net: "2025-10-19T22:45:00Z",
    launch_service_provider: { name: "Arianespace" },
    rocket: { configuration: { name: "Soyuz 2.1b", family: "Soyuz" } },
    pad: { name: "Site 31/6", location: { name: "Baikonur Cosmodrome, Kazakhstan", country_code: "KAZ" } }
  },
  {
    id: "mock-5",
    name: "NROL-91",
    net: "2025-10-20T03:30:00Z",
    launch_service_provider: { name: "United Launch Alliance" },
    rocket: { configuration: { name: "Atlas V 541", family: "Atlas" } },
    pad: { name: "SLC-41", location: { name: "Cape Canaveral SFS, FL, USA", country_code: "USA" } }
  },
  {
    id: "mock-6",
    name: "Tianzhou-7",
    net: "2025-10-21T16:00:00Z",
    launch_service_provider: { name: "CASC" },
    rocket: { configuration: { name: "Long March 7", family: "Long March" } },
    pad: { name: "LC-201", location: { name: "Wenchang Satellite Launch Center, China", country_code: "CHN" } }
  },
  {
    id: "mock-7",
    name: "Starlink Group 7-2",
    net: "2025-10-22T10:20:00Z",
    launch_service_provider: { name: "SpaceX" },
    rocket: { configuration: { name: "Falcon 9 Block 5", family: "Falcon" } },
    pad: { name: "SLC-4E", location: { name: "Vandenberg SFB, CA, USA", country_code: "USA" } }
  },
  {
    id: "mock-8",
    name: "EUCLID-2",
    net: "2025-10-23T18:45:00Z",
    launch_service_provider: { name: "ESA" },
    rocket: { configuration: { name: "Ariane 6", family: "Ariane" } },
    pad: { name: "ELA-4", location: { name: "Guiana Space Centre, French Guiana", country_code: "GUF" } }
  }
];

export const MOCK_CELESTRAK_CSV = `OBJECT_NAME,OBJECT_ID,EPOCH,MEAN_MOTION,ECCENTRICITY,INCLINATION,RA_OF_ASC_NODE,ARG_OF_PERICENTER,MEAN_ANOMALY,EPHEMERIS_TYPE,CLASSIFICATION_TYPE,NORAD_CAT_ID,ELEMENT_SET_NO,REV_AT_EPOCH,BSTAR,MEAN_MOTION_DOT,MEAN_MOTION_DDOT
ISS (ZARYA),1998-067A,2025-10-04T12:00:00,15.50103472,0.0006703,51.6416,45.8932,68.4521,291.6874,0,U,25544,999,12345,0.00012345,0.00000123,0
STARLINK-1007,2019-074A,2025-10-04T11:30:00,15.19258943,0.0001234,53.0543,123.4567,234.5678,125.4321,0,U,44713,888,11234,0.00023456,0.00000234,0
HUBBLE SPACE TELESCOPE,1990-037B,2025-10-04T10:45:00,14.99845123,0.0003456,28.4698,234.5678,345.6789,14.3210,0,U,20580,777,10123,0.00034567,0.00000345,0
SENTINEL-1A,2014-016A,2025-10-04T09:20:00,14.56789012,0.0001567,98.1823,345.6789,456.7890,103.2109,0,U,39634,666,9012,0.00045678,0.00000456,0
TIANGONG,2021-035A,2025-10-04T08:15:00,15.48901234,0.0002345,42.7789,456.7890,567.8901,332.1098,0,U,48274,555,8901,0.00056789,0.00000567,0
GOES-16,2016-071A,2025-10-04T07:30:00,1.00271234,0.0001789,0.0345,567.8901,678.9012,221.0987,0,U,41866,444,7890,0.00067890,0.00000678,0
TERRA,1999-068A,2025-10-04T06:45:00,14.57123456,0.0000987,98.2156,678.9012,789.0123,110.9876,0,U,25994,333,6789,0.00078901,0.00000789,0
NOAA-20,2017-073A,2025-10-04T05:50:00,14.19234567,0.0001345,98.7234,789.0123,890.1234,99.8765,0,U,43013,222,5678,0.00089012,0.00000890,0
METEOSAT-11,2015-034A,2025-10-04T04:30:00,1.00234567,0.0002123,0.0567,890.1234,901.2345,88.7654,0,U,40732,111,4567,0.00090123,0.00000901,0
JASON-3,2016-002A,2025-10-04T03:15:00,12.87345678,0.0000876,66.0389,901.2345,12.3456,77.6543,0,U,41240,100,3456,0.00012340,0.00001234,0`;

export const MOCK_DONKI_CME = [
  {
    activityID: "2025-10-01T12:36:00-CME-001",
    catalog: "M2",
    startTime: "2025-10-01T12:36:00Z",
    sourceLocation: "N15W23",
    activeRegionNum: 13456,
    note: "A halo CME associated with a solar flare from AR 13456. Estimated arrival time at Earth: 2025-10-03T18:00Z. Minor geomagnetic storm conditions possible.",
    cmeAnalyses: [
      {
        time21_5: "2025-10-01T13:12:00Z",
        latitude: 15,
        longitude: -23,
        speed: 650,
        type: "S",
        isMostAccurate: true
      }
    ]
  },
  {
    activityID: "2025-09-28T08:24:00-CME-001",
    catalog: "C9",
    startTime: "2025-09-28T08:24:00Z",
    sourceLocation: "S12E45",
    activeRegionNum: 13442,
    note: "Asymmetric partial halo CME. Earth-directed component minimal. No significant impacts expected.",
    cmeAnalyses: [
      {
        time21_5: "2025-09-28T09:00:00Z",
        latitude: -12,
        longitude: 45,
        speed: 480,
        type: "S",
        isMostAccurate: true
      }
    ]
  },
  {
    activityID: "2025-09-25T15:48:00-CME-001",
    catalog: "M5",
    startTime: "2025-09-25T15:48:00Z",
    sourceLocation: "N08W67",
    activeRegionNum: 13438,
    note: "Full halo CME with high-speed ejecta. Arrived at Earth 2025-09-27T22:00Z. Moderate geomagnetic storm (G2) observed.",
    cmeAnalyses: [
      {
        time21_5: "2025-09-25T16:36:00Z",
        latitude: 8,
        longitude: -67,
        speed: 890,
        type: "S",
        isMostAccurate: true
      }
    ]
  }
];

export const MOCK_ISS_NOW = {
  message: "success",
  timestamp: Math.floor(Date.now() / 1000),
  iss_position: {
    latitude: "23.4567",
    longitude: "-45.8901"
  }
};
