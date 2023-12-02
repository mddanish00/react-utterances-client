/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

function dispatchStorageEvent(key: string, newValue?: string) {
	window.dispatchEvent(new StorageEvent('storage', { key, newValue }));
}

const setStorageItem = (type: Storage, key: string, value: string) => {
	type.setItem(key, value);
	dispatchStorageEvent(key, value);
};

const removeStorageItem = (type: Storage, key: string) => {
	type.removeItem(key);
	dispatchStorageEvent(key);
};

const getStorageItem = (type: Storage, key: string) => {
	return type.getItem(key);
};

const useStorageSubscribe = (callback: {
	(this: Window, ev: StorageEvent): any;
	(this: Window, ev: StorageEvent): any;
}) => {
	window.addEventListener('storage', callback);
	return () => window.removeEventListener('storage', callback);
};

const getStorageServerSnapshot = () => {
	return 'SSR_NO_TOKEN';
};

export function useUtterancesSession(
	type: Storage,
): [string, React.Dispatch<React.SetStateAction<string>>] {
	const key = 'utterances-session';
	const initialValue = 'INITIAL';
	const getSnapshot = () => getStorageItem(type, key);

	const token = React.useSyncExternalStore(
		useStorageSubscribe,
		getSnapshot,
		getStorageServerSnapshot,
	);

	const setState: React.Dispatch<React.SetStateAction<string>> = React.useCallback(
		(v) => {
			try {
				const nextState = typeof v === 'function' ? v(token || '') : v;

				if (nextState === undefined || nextState === null) {
					removeStorageItem(type, key);
				} else {
					setStorageItem(type, key, nextState);
				}
			} catch (e) {
				console.warn(e);
			}
		},
		[key, token, type],
	);

	React.useEffect(() => {
		if (getStorageItem(type, key) === null) {
			setStorageItem(type, key, initialValue);
		}
	}, [key, type]);

	return [token ? token : initialValue, setState];
}
