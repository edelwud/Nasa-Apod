import React from "react";
import axios from "axios";
import moment from "moment";

import config from "../constatnts/nasa";
import ImageFormat from "../models/ImageFormat";

export async function getAPODImage(hdResolution: boolean): Promise<ImageFormat> {
	const { data } = await axios.get(`${config.HOST}?api_key=${config.KEY}&hd=${hdResolution}`);
	data.date = new Date(data.date);
	return data;
}

export async function getRecentAPODImage(date: Date, hdResolution: boolean): Promise<ImageFormat> {
	const dateStringify = moment(date).format("YYYY-MM-DD");
	const { data } = await axios.get(`${config.HOST}?api_key=${config.KEY}&date=${dateStringify}&hd=${hdResolution}`);
	data.date = new Date(data.date);
	return data;
}

export async function loadImage(imageUpdate: React.Dispatch<ImageFormat>) {
	const apodDay = localStorage.getItem("apod_day");
	apodDay ?
		imageUpdate(await getRecentAPODImage(new Date(apodDay), true)) :
		imageUpdate(await getAPODImage(true));
}
