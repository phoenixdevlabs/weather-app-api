/* 
    The API endpoint /v1/forecast accepts a geographical coordinate, 
    a list of weather variables and responds with a JSON hourly weather forecast for 7 days. 
    Time always starts at 0:00 today and contains 168 hours. 
    If &forecast_days=16 is set, up to 16 days of forecast can be returned. 
    All URL parameters are listed below:
*/

export type URLParams = {
    latitude: number;
    longitude: number;
    /* 
    Format          Floating point	
    Required        Yes		
    Default     
    Description     Geographical WGS84 coordinates of the location. 
                    Multiple coordinates can be comma separated. 
                    E.g. &latitude=52.52,48.85&longitude=13.41,2.35. 
                    To return data for multiple locations the JSON output changes to a list of structures. 
                    CSV and XLSX formats add a column location_id. 
                    For North and South America locations use negative longitudes, because they lie west of Greenwich. 
    */

    elevation?: number;
    /* 
    Format          Floating point	
    Required        No
    Default 
    Description     The elevation used for statistical downscaling. 
                    Per default, a 90 meter digital elevation model is used. 
                    You can manually set the elevation to correctly match mountain peaks. 
                    If &elevation=nan is specified, downscaling will be disabled and the API uses the average grid-cell height. 
                    For multiple locations, elevation can also be comma separated. */

    hourly?: HourlyParameters;
    /* 
    FormatString    array	
    Required        No
    Default
    Description     A list of weather variables which should be returned. 
                    Values can be comma separated, or multiple &hourly= parameter in the URL can be used. */

    daily?: DailyParameters;
    /* 
    Format          String array	
    Required        No		
    Default 
    Description     A list of daily weather variable aggregations which should be returned. 
                    Values can be comma separated, or multiple &daily= parameter in the URL can be used. 
                    If daily weather variables are specified, parameter timezone is required. */

    current?: Current;
    /* 
    Format          String array	
    Required        No
    Default 
    Description     A list of weather variables to get current conditions. */

    temperature_unit?: string;
    /* 
    Format          String	
    Required        No	
    Default         celsius	
    Description     If fahrenheit is set, all temperature values are converted to Fahrenheit. */

    wind_speed_unit?: string;
    /* 
    Format          String	
    Required        No	
    Default         kmh	
    Description     Other wind speed units: ms, mph and kn */

    precipitation_unit?: string;
    /* 
    Format          String	
    Required        No	
    Default         mm	
    Description     Other precipitation amount units: inch */

    timeformat?: "unixtime";
    /* 
    Format          String	
    Required        No	
    Default         iso8601	
    Description     If format unixtime is selected, all time values are returned in UNIX epoch time in seconds. 
                    Please note that all timestamp are in GMT+0! 
                    For daily values with unix timestamps, please apply utc_offset_seconds again to get the correct date. */

    timezone?: string;
    /* 
    Format          String	
    Required        No	
    Default         GMT	
    Description     If timezone is set, all timestamps are returned as local-time and data is returned starting at 00:00 local-time. 
                    Any time zone name from the time zone database is supported. 
                    If auto is set as a time zone, the coordinates will be automatically resolved to the local time zone. 
                    For multiple coordinates, a comma separated list of timezones can be specified. */

    past_days?: number;
    /* 
    Format          Integer (0-92)	
    Required        No	
    Default         0	
    Description     If past_days is set, yesterday or the day before yesterday data are also returned. */

    forecast_days?: number;
    /* 
    Format          Integer (0-16)	
    Required        No	
    Default         7	
    Description     Per default, only 7 days are returned. Up to 16 days of forecast are possible. */

    forecast_hours?: number;
    forecast_minutely_15?: number;
    past_hours?: number;
    past_minutely_15?: number;
    /* 
    Format          Integer (>0)	
    Required        No		
    Default 
    Description     Similar to forecast_days, the number of timesteps of hourly and 15-minutely data can controlled. 
                    Instead of using the current day as a reference, the current hour or the current 15-minute time-step is used. */

    start_date?: string;
    end_date?: string;
    /* 
    Format          String (yyyy-mm-dd)	
    Required        No		
    Default 
    Description     The time interval to get weather data. A day must be specified as an ISO8601 date (e.g. 2022-06-30). */

    start_hour?: string;
    end_hour?: string;
    start_minutely_15?: string;
    end_minutely_15?: string;
    /* 
    Format          String (yyyy-mm-ddThh:mm)	
    Required        No		
    Default 
    Description     The time interval to get weather data for hourly or 15 minutely data. 
                    Time must be specified as an ISO8601 date (e.g. 2022-06-30T12:00). */

    models?: string;
    /* 
    Format          String array	
    Required        No	
    Default         auto	
    Description     Manually select one or more weather models. Per default, the best suitable weather models will be combined. */

    cell_selection?: string;
    /* 
    Format          String	
    Required        No	
    Default         land	
    Description     Set a preference how grid-cells are selected. The default land finds a suitable grid-cell on land with 
                    similar elevation to the requested coordinates using a 90-meter digital elevation model. 
                    sea prefers grid-cells on sea. nearest selects the nearest possible grid-cell. */

    apikey?: string;
    /* 
    Format          String	
    Required        No	
    Default 
    Description     Only required to commercial use to access reserved API resources for customers. 
                    The server URL requires the prefix customer-. See pricing for more information. */
};

export type CurrentWeatherType =
    | {
          latitude: number;
          longitude: number;
          elevation: number;
          timezone: string | null;
          timezoneAbbreviation: string | null;
          utcOffsetSeconds: number;
          current: CurrentResponse;
          daily: DailyResponse;
          hourly: HourlyResponse;
      }
    | undefined;

export type HourlyWeatherType =
    | {
          latitude: number;
          longitude: number;
          elevation: number;
          timezone: string | null;
          timezoneAbbreviation: string | null;
          utcOffsetSeconds: number;
          hourly: HourlyResponse;
      }
    | undefined;

export type DailyWeatherType =
    | {
          latitude: number;
          longitude: number;
          elevation: number;
          timezone: string | null;
          timezoneAbbreviation: string | null;
          utcOffsetSeconds: number;
          daily: DailyResponse[];
      }
    | undefined;

export type Current = CurrentVariables[];
export type HourlyParameters = HourlyParametersVariables[];
export type DailyParameters = DailyParametersVariables[];

export type CurrentResponse = {
    time: Date;
    temperature_2m?: number;
    weather_code?: number;
    is_day?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    wind_speed_10m?: number;
    wind_direction_10m?: number;
    wind_gusts_10m?: number;
    rain?: number;
    precipitation?: number;
    showers?: number;
    snowfall?: number;
    surface_pressure?: number;
    pressure_msl?: number;
    cloud_cover?: number;
};

export type HourlyResponse = {
    time: Date[];
    temperature_2m?: number[];
    relative_humidity_2m?: number[];
    dew_point_2m?: number[];
    apparent_temperature?: number[];
    pressure_msl?: number[];
    surface_pressure?: number[];
    cloud_cover?: number[];
    cloud_cover_low?: number[];
    cloud_cover_mid?: number[];
    cloud_cover_high?: number[];
    wind_speed_10m?: number[];
    wind_speed_80m?: number[];
    wind_speed_120m?: number[];
    wind_speed_180m?: number[];
    wind_direction_10m?: number[];
    wind_direction_80m?: number[];
    wind_direction_120m?: number[];
    wind_direction_180m?: number[];
    wind_gusts_10m?: number[];
    shortwave_radiation?: number[];
    direct_radiation?: number[];
    direct_normal_irradiance?: number[];
    diffuse_radiation?: number[];
    global_tilted_irradiance?: number[];
    vapour_pressure_deficit?: number[];
    cape?: number[];
    evapotranspiration?: number[];
    et0_fao_evapotranspiration?: number[];
    precipitation?: number[];
    snowfall?: number[];
    precipitation_probability?: number[];
    rain?: number[];
    showers?: number[];
    weather_code?: number[];
    snow_depth?: number[];
    freezing_level_height?: number[];
    visibility?: number[];
    soil_temperature_0cm?: number[];
    soil_temperature_6cm?: number[];
    soil_temperature_18cm?: number[];
    soil_temperature_54cm?: number[];
    soil_moisture_0_to_1cm?: number[];
    soil_moisture_1_to_3cm?: number[];
    soil_moisture_3_to_9cm?: number[];
    soil_moisture_9_to_27cm?: number[];
    soil_moisture_27_to_81cm?: number[];
    is_day?: number[];
    uv_index?: number[];
    uv_index_clear_sky?: number[];
    sunshine_duration?: number[];
    wet_bulb_temperature_2m?: number[];
    total_column_integrated_water_vapour?: number[];
    lifted_index?: number[];
    convective_inhibition?: number[];
    boundary_layer_height?: number[];
};

export type DailyResponse = {
    time: Date[];
    temperature_2m_max?: number[];
    temperature_2m_mean?: number[];
    temperature_2m_min?: number[];
    apparent_temperature_max?: number[];
    apparent_temperature_mean?: number[];
    apparent_temperature_min?: number[];
    precipitation_sum?: number[];
    rain_sum?: number[];
    showers_sum?: number[];
    snowfall_sum?: number[];
    precipitation_hours?: number[];
    precipitation_probability_max?: number[];
    precipitation_probability_mean?: number[];
    precipitation_probability_min?: number[];
    weather_code?: number[];
    sunrise?: Date[];
    sunset?: Date[];
    sunshine_duration?: number[];
    daylight_duration?: number[];
    wind_speed_10m_max?: number[];
    wind_gusts_10m_max?: number[];
    wind_direction_10m_dominant?: number[];
    shortwave_radiation_sum?: number[];
    et0_fao_evapotranspiration?: number[];
    uv_index_max?: number[];
    uv_index_clear_sky_max?: number[];
};

export type GeocodingResponse =
    | {
          results: GeocodingResults;
      }
    | undefined;

export type GeocodingResults = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code: string;
    admin1_id: number;
    admin2_id: number;
    admin3_id: number;
    admin4_id: number;
    timezone: string;
    population: number;
    postcodes: string[];
    country_id: number;
    country: string;
    admin1: string;
    admin2: string;
    admin3: string;
    admin4: string;
}[];

export type ReverseGeocodingParams = {
    /* https://docs.locationiq.com/reference/reverse-api */

    key: string;

    lat: number;
    //  float required Latitude of the location to generate an address for.

    lon: number;
    //  float required Longitude of the location to generate an address for.

    format: "xml" | "json" | "xmlv1.1";
    //Defaults to xml

    zoom?: 3 | 5 | 8 | 10 | 14 | 16 | 18;
    /*  3	country
        5	state
        8	county
        10	city
        14	suburb
        16	street
        18	building */

    "accept-language"?: string; //Defaults to en
    /*  Preferred language order for showing search results, overrides the value specified in the Accept-Language HTTP header. Defaults to en.

        To use native language for the response when available, use accept-language=native.

        Either uses standard rfc2616 accept-language string or a simple comma separated list of language codes. */

    addressdetails?: number; //Defaults to 1

    normalizeaddress?: number; //Defaults to 0
    /*  Makes parsing of the address object easier by returning a predictable and defined list of elements. Defaults to 0 for backward compatibility. 
        We recommend setting this to 1 for new projects. */

    normalizecity?: number; //Defaults to 0
    /*  For responses with no city value in the address section, the next available element in this order - city_district, locality, town, borough, municipality, village, hamlet, quarter, neighbourhood - from the address section will be normalized to city. Defaults to 0. */

    postaladdress?: number; //Defaults to 0
    //  Returns address inside the postaladdress key, that is specifically formatted for each country. Currently supported for addresses in Belgium, Brazil, France, Germany, Greece, India, Ireland, Italy, Portugal, South Africa, Spain and United Kingdom. Defaults to 0.

    oceans?: number; //Defaults to 0
    //  Allows you to specify whether or not the API should return the name of an ocean or sea if the coordinates provided fall within a body of water. By default, this parameter is set to 0 for backward compatibility. When set to 1 and used in conjunction with addressdetails=1, the response will contain a limited address section consisting of only the name and water elements, providing the name of the ocean or sea the coordinates correspond to, if the coordinates fall within a body of water.

    showdistance?: number; //Defaults to 0
    //  Returns the straight line distance (meters) between the input location and the result's location. Value is set in the distance key of the response. Defaults to 0.

    statecode?: number; //Defaults to 0
    //  Adds state or province code when available to the state_code key inside the address object when available. Defaults to 0.

    source?: string;
    //  If this parameter is not specified, LocationIQ uses multiple public and proprietary datasets to return results. If you'd like to restrict results to only OpenStreetMap data, you can set the value of this parameter to nom. This will only query our internal cluster of Nominatim servers, and return results. We may still apply some post-processing steps to these results though, so results may vary from the official Nominatim instance.

    namedetails?: number; //Defaults to 0
    //  Include a list of alternative names in the results. These may include language variants, references, operator and brand. Defaults to 0.

    extratags?: number; //Defaults to 0
    //  Include additional information in the result if available, e.g. wikipedia link, opening hours. Defaults to 0.

    polygon_geojson?: number; //Defaults to 0
    //  Output geometry of results in geojson format. Defaults to 0.

    polygon_kml?: number; //Defaults to 0
    //  Output geometry of results in kml format. Defaults to 0.

    polygon_svg?: number; //Defaults to 0
    //  Output geometry of results in svg format. Defaults to 0.

    polygon_text?: number; //Defaults to 0
    //  Output geometry of results as a WKT. Defaults to 0.

    polygon_threshold?: number; //Defaults to 0
    //  When one of the polygon_* outputs is chosen, return a simplified version of the output geometry. The parameter describes the tolerance in degrees with which the geometry may differ from the original geometry. Topology is preserved in the geometry.
};

export type ReverseGeocodingResponse = {
    place_id: string;
    /* required Unique identifier for the place. */

    licence: string;
    /* required License information for the data. */

    osm_type: string;
    /* Type of OpenStreetMap object. */

    osm_id: string;
    /* Unique identifier for the OpenStreetMap object. */

    lat: string;
    /* required Latitude of the location. */

    lon: string;
    /* required Longitude of the location. */

    display_name: string;
    /* required Formatted address for display. */

    address: Address | NormalizedAddress;

    boundingbox: string[];
    /* required List of bounding box coordinates [min_lat, max_lat, min_lon, max_lon]. */

    distance: number;
    /* The straight line distance (meters) between the input location and the result's location. Returned when showdistance=1 is set in the request. */

    namedetails: object;
    /* object The dictionary with full list of available names including ref etc. Returned when namedetails=1 is set in the request. */

    name: string;

    extratags: object;
    /* object The dictionary with additional useful tags like website or maxspeed. Returned when extratags=1 is set in the request. */

    geojson: object;
    /* object Output geometry of results in geojson format. Returned when polygon_geojson=1 is set in the request. */

    type: string;

    coordinates: number[];

    geokml: string;
    /* Output geometry of results in kml format. Returned when polygon_kml=1 is set in the request. */

    svg: string;
    /* Output geometry of results in svg format. Returned when polygon_svg=1 is set in the request. */

    geotext: string;
    /* Output geometry of results as a WKT. Returned when polygon_text=1 is set in the request. */

    postaladdress: string;
    /* Returns address specifically formatted for each country. Returned when postaladdress is set in the request */
};

export type Address = {
    house_number: string;
    road: string;
    neighbourhood: string;
    hamlet: string;
    suburb: string;
    village: string;
    town: string;
    city_district: string;
    city: string;
    region: string;
    county: string;
    state_district: string;
    state: string;
    state_code: string;
    postcode: string;
    country: string;
    country_code: string;
    name: string;
    water: string;
};

export type NormalizedAddress = {
    name: string;
    house_number: string;
    road: string;
    neighbourhood: string;
    suburb: string;
    island: string;
    city: string;
    county: string;
    state: string;
    state_code: string;
    postcode: string;
    country: string;
    country_code: string;
};

type CurrentVariables =
    | "temperature_2m"
    | "relative_humidity_2m"
    | "apparent_temperature"
    | "is_day"
    | "wind_speed_10m"
    | "wind_direction_10m"
    | "wind_gusts_10m"
    | "precipitation"
    | "rain"
    | "showers"
    | "snowfall"
    | "weather_code"
    | "cloud_cover"
    | "pressure_msl"
    | "surface_pressure";

type DailyParametersVariables =
    | "temperature_2m_max"
    | "temperature_2m_mean"
    | "temperature_2m_min" /* °C (°F)	Maximum and minimum daily air temperature at 2 meters above ground */
    | "apparent_temperature_max"
    | "apparent_temperature_mean"
    | "apparent_temperature_min" /* °C(°F)	Maximum and minimum daily apparent temperature */
    | "precipitation_sum" /* mm	Sum of daily precipitation(including rain, showers and snowfall) */
    | "rain_sum" /* mm	Sum of daily rain */
    | "showers_sum" /* mm	Sum of daily showers */
    | "snowfall_sum" /* cm	Sum of daily snowfall */
    | "precipitation_hours" /* hours	The number of hours with rain */
    | "precipitation_probability_max"
    | "precipitation_probability_mean"
    | "precipitation_probability_min" /* % Probability of precipitation */
    | "weather_code" /* WMO code	The most severe weather condition on a given day */
    | "sunrise"
    | "sunset" /* iso8601	Sun rise and set times */
    | "sunshine_duration" /* seconds	The number of seconds of sunshine per day is determined by calculating direct normalized irradiance exceeding 120 W / m², following the WMO definition.Sunshine duration will consistently be less than daylight duration due to dawn and dusk. */
    | "daylight_duration" /* seconds	Number of seconds of daylight per day */
    | "wind_speed_10m_max"
    | "wind_gusts_10m_max" /* km / h(mph, m / s, knots)	Maximum wind speed and gusts on a day */
    | "wind_direction_10m_dominant" /* '°'	Dominant wind direction */
    | "shortwave_radiation_sum" /* MJ / m²	The sum of solar radiation on a given day in Megajoules */
    | "et0_fao_evapotranspiration" /* mm	Daily sum of ET₀ Reference Evapotranspiration of a well watered grass field */
    | "uv_index_max"
    | "uv_index_clear_sky_max" /* Index	Daily maximum in UV Index starting from 0. uv_index_clear_sky_max assumes cloud free conditions.Please follow the official WMO guidelines for ultraviolet index. */;

type HourlyParametersVariables =
    | "temperature_2m" /* Instant	°C(°F)	Air temperature at 2 meters above ground */
    | "relative_humidity_2m" /* Instant % Relative humidity at 2 meters above ground */
    | "dew_point_2m" /* Instant	°C(°F)	Dew point temperature at 2 meters above ground */
    | "apparent_temperature" /* Instant	°C(°F)	Apparent temperature is the perceived feels - like temperature combining wind chill factor, relative humidity and solar radiation */
    | "pressure_msl"
    | "surface_pressure" /* Instant	hPa	Atmospheric air pressure reduced to mean sea level(msl) or pressure at surface.Typically pressure on mean sea level is used in meteorology.Surface pressure gets lower with increasing elevation. */
    | "cloud_cover" /* Instant % Total cloud cover as an area fraction */
    | "cloud_cover_low" /* Instant % Low level clouds and fog up to 3 km altitude */
    | "cloud_cover_mid" /* Instant % Mid level clouds from 3 to 8 km altitude */
    | "cloud_cover_high" /* Instant % High level clouds from 8 km altitude */
    | "wind_speed_10m"
    | "wind_speed_80m"
    | "wind_speed_120m"
    | "wind_speed_180m" /* Instant	km / h(mph, m / s, knots)	Wind speed at 10, 80, 120 or 180 meters above ground.Wind speed on 10 meters is the standard level. */
    | "wind_direction_10m"
    | "wind_direction_80m"
    | "wind_direction_120m"
    | "wind_direction_180m" /* Instant	°	Wind direction at 10, 80, 120 or 180 meters above ground */
    | "wind_gusts_10m" /* Preceding hour max	km / h(mph, m / s, knots)	Gusts at 10 meters above ground as a maximum of the preceding hour */
    | "shortwave_radiation" /* Preceding hour mean	W / m²	Shortwave solar radiation as average of the preceding hour.This is equal to the total global horizontal irradiation */
    | "direct_radiation"
    | "direct_normal_irradiance" /* Preceding hour mean	W / m²	Direct solar radiation as average of the preceding hour on the horizontal plane and the normal plane(perpendicular to the sun) */
    | "diffuse_radiation" /* Preceding hour mean	W / m²	Diffuse solar radiation as average of the preceding hour */
    | "global_tilted_irradiance" /* Preceding hour mean	W / m²	Total radiation received on a tilted pane as average of the preceding hour.The calculation is assuming a fixed albedo of 20 % and in isotropic sky.Please specify tilt and azimuth parameter.Tilt ranges from 0° to 90° and is typically around 45°. Azimuth should be close to 0° (0° south, -90° east, 90° west, ±180 north). If azimuth is set to 'nan', the calculation assumes a vertical tracker(east - west).If tilt is set to 'nan', it is assumed that the panel has a horizontal tracker(up - down).If both are set to 'nan', a bi - axial tracker is assumed. */
    | "vapour_pressure_deficit" /* Instant	kPa	Vapour Pressure Deficit(VPD) in kilopascal(kPa).For high VPD(> 1.6), water transpiration of plants increases.For low VPD(<0.4), transpiration decreases */
    | "cape" /* Instant	J / kg	Convective available potential energy.See Wikipedia. */
    | "evapotranspiration" /* Preceding hour sum	mm(inch)	Evapotranspration from land surface and plants that weather models assumes for this location.Available soil water is considered. 1 mm evapotranspiration per hour equals 1 liter of water per spare meter. */
    | "et0_fao_evapotranspiration" /* Preceding hour sum	mm(inch)	ET₀ Reference Evapotranspiration of a well watered grass field.Based on FAO - 56 Penman - Monteith equations ET₀ is calculated from temperature, wind speed, humidity and solar radiation.Unlimited soil water is assumed.ET₀ is commonly used to estimate the required irrigation for plants. */
    | "precipitation" /* Preceding hour sum	mm(inch)	Total precipitation(rain, showers, snow) sum of the preceding hour */
    | "snowfall" /* Preceding hour sum	cm(inch)	Snowfall amount of the preceding hour in centimeters.For the water equivalent in millimeter, divide by 7. E.g. 7 cm snow = 10 mm precipitation water equivalent */
    | "precipitation_probability" /* Preceding hour probability % Probability of precipitation with more than 0.1 mm of the preceding hour.Probability is based on ensemble weather models with 0.25° (~27 km) resolution. 30 different simulations are computed to better represent future weather conditions. */
    | "rain" /* Preceding hour sum	mm(inch)	Rain from large scale weather systems of the preceding hour in millimeter */
    | "showers" /* Preceding hour sum	mm(inch)	Showers from convective precipitation in millimeters from the preceding hour */
    | "weather_code" /* Instant	WMO code	Weather condition as a numeric code.Follow WMO weather interpretation codes.See table below for details. */
    | "snow_depth" /* Instant	meters	Snow depth on the ground */
    | "freezing_level_height" /* Instant	meters	Altitude above sea level of the 0°C level */
    | "visibility" /* Instant	meters	Viewing distance in meters.Influenced by low clouds, humidity and aerosols. */
    | "soil_temperature_0cm"
    | "soil_temperature_6cm"
    | "soil_temperature_18cm"
    | "soil_temperature_54cm" /* Instant	°C(°F)	Temperature in the soil at 0, 6, 18 and 54 cm depths. 0 cm is the surface temperature on land or water surface temperature on water. */
    | "soil_moisture_0_to_1cm"
    | "soil_moisture_1_to_3cm"
    | "soil_moisture_3_to_9cm"
    | "soil_moisture_9_to_27cm"
    | "soil_moisture_27_to_81cm" /* Instant	m³/m³	Average soil water content as volumetric mixing ratio at 0-1, 1-3, 3-9, 9-27 and 27-81 cm depths. */
    | "is_day" /* Instant	Dimensionless	1 if the current time step has daylight, 0 at night. */

    /* Aditional paramaters */
    | "uv_index"
    | "uv_index_clear_sky"
    | "sunshine_duration"
    | "wet_bulb_temperature_2m"
    | "total_column_integrated_water_vapour"
    | "lifted_index"
    | "convective_inhibition"
    | "boundary_layer_height";
