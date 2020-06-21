export type MediaType = "image" | "video";

export default interface ImageFormat {
	title: string;
	explanation: string;
	media_type: MediaType;
	url: string;
	hdurl: string;
	date: Date;
	service_version: string;
}
