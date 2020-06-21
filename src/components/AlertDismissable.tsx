import Alert from "react-bootstrap/Alert";
import React from "react";
import ErrorFormat from "../models/ErrorFormat";

type AlertDismissibleProps = {
	error: ErrorFormat;
	setError: React.Dispatch<ErrorFormat>;
}

export default function AlertDismissible({ error, setError }: AlertDismissibleProps) {
	if (error.occurred) {
		return (
			<Alert variant="danger" onClose={() => setError({ ...error, occurred: false })} dismissible>
				<Alert.Heading>{error.title}</Alert.Heading>
				<p>{error.explanation}</p>
			</Alert>
		);
	}
	return <></>
}
