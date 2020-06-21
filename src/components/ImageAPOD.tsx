import Figure from "react-bootstrap/Figure";
import React from "react";

import ImageFormat from "../models/ImageFormat";

type ImageAPODProps = {
	image: ImageFormat;
}

export default function ImageAPOD({ image }: ImageAPODProps) {
	return (
		<Figure>
			<Figure.Image src={image.url} fluid />
			<Figure.Caption>
				<h1>{ image.title }</h1>
				<p>{ image.explanation }</p>
			</Figure.Caption>
		</Figure>
	);
}
