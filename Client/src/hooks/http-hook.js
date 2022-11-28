import React, { useCallback, useRef, useState, useEffect } from "react";

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	const activeHttpRequest = useRef([]);

	const sendRequest = useCallback(
		async (url, method = "GET", body = null, headers = {}) => {
			setIsLoading(true);
			const httpAbortCtrl = new AbortController();
			activeHttpRequest.current.push(httpAbortCtrl);
			try {
				const res = await fetch(url, {
					method,
					body,
					headers,
					signal: httpAbortCtrl.signal,
				});

				const resData = await res.json();

				activeHttpRequest.current = activeHttpRequest.current.filter(
					(reqCtrl) => reqCtrl !== httpAbortCtrl
				);

				if (!res.ok) {
					throw new Error(resData.message);
				}

				setIsLoading(false);
				return resData;
			} catch (e) {
				setError(e.message);
				setIsLoading(false);
				throw e;
			}
		},
		[]
	);

	const clearError = () => {
		setError(null);
	};

	useEffect(() => {
		return () => {
			activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abortCtrl());
		};
	}, []);
	return { isLoading, error, sendRequest, clearError };
};

export default useHttpClient;
