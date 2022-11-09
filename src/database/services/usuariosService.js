import { getById, store, getAll } from './../firebaseService';
import { firebaseFolder } from '../firebaseFolders';

export const getdatauserfromid = async uid => {
	if (!uid) throw new Error('No se ha especificado el uid del usuario');
	return await getById(uid, firebaseFolder.DATA_USUARIOS);
};

export const storeUserData = async (uid, displayName, lastname, phone) => {
	if (!uid) throw new Error('No se ha especificado el uid del usuario');

	const userdata = {
		displayName,
		lastname,
		phone,
	};
	return store(uid, firebaseFolder.DATA_USUARIOS, userdata);
};

export const getAllUsers = async () => {
	return await getAll(firebaseFolder.DATA_USUARIOS);
};
