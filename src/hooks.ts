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
	return '';
};

const getStorageType = (type: 'session' | 'local') => {
	return type === 'session' ? window.sessionStorage : window.localStorage;
};

export function useUtterancesSession(
	type: 'session' | 'local',
): [string, React.Dispatch<React.SetStateAction<string>>] {
	const key = 'utterances-session';
	const getSnapshot = () => getStorageItem(getStorageType(type), key);

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
					removeStorageItem(getStorageType(type), key);
				} else {
					setStorageItem(getStorageType(type), key, nextState);
				}
			} catch (e) {
				console.warn(e);
			}
		},
		[key, token, type],
	);

	React.useEffect(() => {
		if (getStorageItem(getStorageType(type), key) === null) {
			setStorageItem(getStorageType(type), key, '');
		}
	}, [key, type]);

	return [token ? token : '', setState];
}
