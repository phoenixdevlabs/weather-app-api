import type {
    Current,
    CurrentResponse,
    CurrentWeatherType,
    DailyParameters,
    DailyResponse,
    HourlyParameters,
    HourlyResponse,
    HourlyWeatherType,
    ReverseGeocodingParams,
    URLParams,
} from "../types/index.ts";

import { fetchWeatherApi } from "openmeteo";

export const getCurrentWeather = async ({
    lat,
    lon,
}: {
    lat: number;
    lon: number;
}) => {
    const currentData: Current = [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "is_day",
        "wind_speed_10m",
        "wind_direction_10m",
        "wind_gusts_10m",
        "precipitation",
        "rain",
        "showers",
        "snowfall",
        "weather_code",
        "cloud_cover",
        "pressure_msl",
        "surface_pressure",
    ];

    const dailyData: DailyParameters = [
        "temperature_2m_max",
        "temperature_2m_mean",
        "temperature_2m_min",
        "apparent_temperature_max",
        "apparent_temperature_mean",
        "apparent_temperature_min",
        "precipitation_sum",
        "rain_sum",
        "showers_sum",
        "snowfall_sum",
        "precipitation_hours",
        "precipitation_probability_max",
        "precipitation_probability_mean",
        "precipitation_probability_min",
        "weather_code",
        "sunrise",
        "sunset",
        "sunshine_duration",
        "daylight_duration",
        "wind_speed_10m_max",
        "wind_gusts_10m_max",
        "wind_direction_10m_dominant",
        "shortwave_radiation_sum",
        "et0_fao_evapotranspiration",
        "uv_index_max",
        "uv_index_clear_sky_max",
    ];

    const hourlyData: HourlyParameters = [
        "temperature_2m",
        "relative_humidity_2m",
        "dew_point_2m",
        "apparent_temperature",
        "pressure_msl",
        "surface_pressure",
        "cloud_cover",
        "cloud_cover_low",
        "cloud_cover_mid",
        "cloud_cover_high",
        "wind_speed_10m",
        "wind_speed_80m",
        "wind_speed_120m",
        "wind_speed_180m",
        "wind_direction_10m",
        "wind_direction_80m",
        "wind_direction_120m",
        "wind_direction_180m",
        "wind_gusts_10m",
        "shortwave_radiation",
        "direct_radiation",
        "direct_normal_irradiance",
        "diffuse_radiation",
        "global_tilted_irradiance",
        "vapour_pressure_deficit",
        "cape",
        "evapotranspiration",
        "et0_fao_evapotranspiration",
        "precipitation",
        "snowfall",
        "precipitation_probability",
        "rain",
        "showers",
        "weather_code",
        "snow_depth",
        "freezing_level_height",
        "visibility",
        "soil_temperature_0cm",
        "soil_temperature_6cm",
        "soil_temperature_18cm",
        "soil_temperature_54cm",
        "soil_moisture_0_to_1cm",
        "soil_moisture_1_to_3cm",
        "soil_moisture_3_to_9cm",
        "soil_moisture_9_to_27cm",
        "soil_moisture_27_to_81cm",
        "is_day",
        "uv_index",
        "uv_index_clear_sky",
        "sunshine_duration",
        "wet_bulb_temperature_2m",
        "total_column_integrated_water_vapour",
        "lifted_index",
        "convective_inhibition",
        "freezing_level_height",
        "boundary_layer_height",
    ];

    const params: URLParams = {
        latitude: lat,
        longitude: lon,
        current: currentData,
        daily: dailyData,
        hourly: hourlyData,
        forecast_days: 14,
        models: "best_match",
        timezone: "auto",
        timeformat: "unixtime",
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];

    const latitude = response?.latitude();
    const longitude = response?.longitude();
    const elevation = response?.elevation();
    const timezone = response?.timezone();
    const timezoneAbbreviation = response?.timezoneAbbreviation();
    const utcOffsetSeconds = response?.utcOffsetSeconds();

    const current = response?.current()!;

    const currentResponse: CurrentResponse = {
        //time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        time: new Date(Number(current.time()) * 1000),
    };

    currentData.forEach((val, index) => {
        currentResponse[val] = current.variables(index)!.value();
    });

    const daily = response?.daily();

    const dailyResponse: DailyResponse = {
        time: Array.from(
            {
                length: daily
                    ? (Number(daily.timeEnd()) - Number(daily.time())) /
                      daily.interval()
                    : 0,
            },
            (_, i) =>
                new Date(
                    (Number(daily!.time()) + i * daily!.interval()) * 1000,
                ),
        ),
    };

    dailyData.forEach((val, index) => {
        if (val === "sunrise" || val === "sunset") {
            const sunData = daily?.variables(index);
            if (!sunData) return;
            dailyResponse[val] = [...Array(sunData.valuesInt64Length())].map(
                (_, i) => new Date(Number(sunData.valuesInt64(i)) * 1000),
            );

            return;
        }

        const values = daily?.variables(index)!.valuesArray();
        if (values) {
            dailyResponse[val] = Array.from(values);
        }
    });

    const hourly = response?.hourly();

    const hourlyResponse: HourlyResponse = {
        time: Array.from(
            {
                length: hourly
                    ? (Number(hourly.timeEnd()) - Number(hourly.time())) /
                      hourly.interval()
                    : 0,
            },
            (_, i) =>
                new Date(
                    (Number(hourly!.time()) + i * hourly!.interval()) * 1000,
                ),
        ),
    };

    hourlyData.forEach((val, index) => {
        const values = hourly?.variables(index)!.valuesArray();
        if (values) {
            hourlyResponse[val] = Array.from(values);
        }
    });

    return {
        latitude,
        longitude,
        elevation,
        timezone,
        timezoneAbbreviation,
        utcOffsetSeconds,
        current: currentResponse,
        daily: dailyResponse,
        hourly: hourlyResponse,
    } as CurrentWeatherType;
};

export const getHourlyWeather = async ({
    lat,
    lon,
}: {
    lat: number;
    lon: number;
}) => {
    const hourlyData: HourlyParameters = [
        "temperature_2m",
        "relative_humidity_2m",
        "dew_point_2m",
        "apparent_temperature",
        "pressure_msl",
        "surface_pressure",
        "cloud_cover",
        "cloud_cover_low",
        "cloud_cover_mid",
        "cloud_cover_high",
        "wind_speed_10m",
        "wind_speed_80m",
        "wind_speed_120m",
        "wind_speed_180m",
        "wind_direction_10m",
        "wind_direction_80m",
        "wind_direction_120m",
        "wind_direction_180m",
        "wind_gusts_10m",
        "shortwave_radiation",
        "direct_radiation",
        "direct_normal_irradiance",
        "diffuse_radiation",
        "global_tilted_irradiance",
        "vapour_pressure_deficit",
        "cape",
        "evapotranspiration",
        "et0_fao_evapotranspiration",
        "precipitation",
        "snowfall",
        "precipitation_probability",
        "rain",
        "showers",
        "weather_code",
        "snow_depth",
        "freezing_level_height",
        "visibility",
        "soil_temperature_0cm",
        "soil_temperature_6cm",
        "soil_temperature_18cm",
        "soil_temperature_54cm",
        "soil_moisture_0_to_1cm",
        "soil_moisture_1_to_3cm",
        "soil_moisture_3_to_9cm",
        "soil_moisture_9_to_27cm",
        "soil_moisture_27_to_81cm",
        "is_day",
        "uv_index",
        "is_day",
        "uv_index_clear_sky",
        "sunshine_duration",
        "wet_bulb_temperature_2m",
        "total_column_integrated_water_vapour",
        "cape",
        "lifted_index",
        "convective_inhibition",
        "freezing_level_height",
        "boundary_layer_height",
    ];

    const params: URLParams = {
        latitude: lat,
        longitude: lon,
        hourly: hourlyData,
        timezone: "auto",
        timeformat: "unixtime",
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];

    const latitude = response?.latitude();
    const longitude = response?.longitude();
    const elevation = response?.elevation();
    const timezone = response?.timezone();
    const timezoneAbbreviation = response?.timezoneAbbreviation();
    const utcOffsetSeconds = response?.utcOffsetSeconds();

    const hourly = response?.hourly();

    const hourlyResponse: HourlyResponse = {
        time: Array.from(
            {
                length: hourly
                    ? (Number(hourly.timeEnd()) - Number(hourly.time())) /
                      hourly.interval()
                    : 0,
            },
            (_, i) =>
                new Date(
                    (Number(hourly!.time()) + i * hourly!.interval()) * 1000,
                ),
        ),
    };

    hourlyData.forEach((val, index) => {
        const values = hourly?.variables(index)!.valuesArray();
        if (values) {
            hourlyResponse[val] = Array.from(values);
        }
    });

    return {
        latitude,
        longitude,
        elevation,
        timezone,
        timezoneAbbreviation,
        utcOffsetSeconds,
        hourly: hourlyResponse,
    } as HourlyWeatherType;
};

export const getGeocodingData = async ({
    name,
    count = 10,
    language,
}: {
    name: string;
    count?: number;
    language: string;
}) => {
    const searchParams =
        `?name=${name}&count=${count}&language=${language}&format=json`.toString();
    const url = `https://geocoding-api.open-meteo.com/v1/search${searchParams}`;

    const response = await fetch(url);

    const geocodingData = await response.json();

    return geocodingData;
};

export const reverseGeocoding = async ({
    lat,
    lon,
}: {
    lat: number;
    lon: number;
}) => {
    const baseUrl = "https://us1.locationiq.com/v1/reverse";

    const params: ReverseGeocodingParams = {
        lat,
        lon,
        format: "json",
        normalizeaddress: 1,
        key: process.env.LOCATION_IQ_APIKEY!,
    };

    const searchParams = Object.entries(params).map((entry) => {
        return `${entry[0]}=${entry[1]}`;
    });

    const queryString = "?" + searchParams.join("&");

    const url = baseUrl + queryString;

    const response = await fetch(url);

    const results = await response.json();

    console.log(url, results);

    return results;
};
