/* eslint-disable curly */
import { Platform } from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  requestMultiple,
  openSettings,
} from 'react-native-permissions';

const Release = ['ios', 'android'].includes(Platform.OS)
  ? Platform.constants.Release
  : 0;

const WEB_PERMISSIONS = {
  LOCATION: 'geolocation',
  CAMERA: 'camera',
  MICROPHONE: 'microphone',
  STORAGE: 'storage',
  NOTIFICATIONS: 'notifications',
};

const isWeb = Platform.OS === 'web';

export const permissionStorageAndroid =
  parseInt(Release) >= 13
    ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

const needAccessStatus = [RESULTS.BLOCKED, RESULTS.DENIED, RESULTS.UNAVAILABLE];

const checkWebPermission = async (permission) => {
  if (!navigator?.permissions) {
    return RESULTS.UNAVAILABLE;
  }

  try {
    const result = await navigator.permissions.query({ name: permission });
    switch (result.state) {
      case 'granted':
        return RESULTS.GRANTED;
      case 'prompt':
        return RESULTS.DENIED;
      case 'denied':
        return RESULTS.BLOCKED;
      default:
        return RESULTS.UNAVAILABLE;
    }
  } catch (error) {
    return RESULTS.UNAVAILABLE;
  }
};

const requestWebPermission = async (permission) => {
  if (!navigator?.mediaDevices && !navigator?.geolocation) {
    return RESULTS.UNAVAILABLE;
  }

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), 10000);
  });

  try {
    switch (permission) {
      case WEB_PERMISSIONS.LOCATION:
        await Promise.race([
          new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                resolve(position);
              },
              (error) => {
                switch (error.code) {
                  case error.PERMISSION_DENIED:
                    reject(new Error('BLOCKED'));
                    break;
                  case error.TIMEOUT:
                    reject(new Error('TIMEOUT'));
                    break;
                  default:
                    reject(new Error('UNAVAILABLE'));
                }
              },
              {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000,
              },
            );
          }),
          timeoutPromise,
        ]);
        return RESULTS.GRANTED;
      case WEB_PERMISSIONS.CAMERA:
      case WEB_PERMISSIONS.MICROPHONE:
        await navigator.mediaDevices.getUserMedia({
          video: permission === WEB_PERMISSIONS.CAMERA,
          audio: permission === WEB_PERMISSIONS.MICROPHONE,
        });
        return RESULTS.GRANTED;
      default:
        return RESULTS.UNAVAILABLE;
    }
  } catch (error) {
    if (error.message === 'BLOCKED') {
      return RESULTS.BLOCKED;
    }
    if (error.message === 'TIMEOUT') {
      return RESULTS.DENIED;
    }
    return error.name === 'NotAllowedError'
      ? RESULTS.BLOCKED
      : RESULTS.UNAVAILABLE;
  }
};

export async function checkPermissionLocation() {
  if (isWeb) {
    const status = await checkWebPermission(WEB_PERMISSIONS.LOCATION);
    return !needAccessStatus.includes(status);
  }

  let permissionStatus = false;
  if (Platform.OS === 'ios') {
    permissionStatus = await checkMultiple([
      PERMISSIONS.IOS.LOCATION_ALWAYS,
    ]).then((statuses) => {
      if (
        needAccessStatus.includes(statuses[PERMISSIONS.IOS.LOCATION_ALWAYS])
      ) {
        return false;
      }
      return true;
    });
  } else if (Platform.OS === 'android') {
    permissionStatus = await checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ]).then((statuses) => {
      if (
        needAccessStatus.includes(
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
        )
      ) {
        return false;
      }
      return true;
    });
  }
  return permissionStatus;
}

export async function checkPermissionMedia() {
  let permissionStatus = false;
  if (Platform.OS === 'ios') {
    permissionStatus = await checkMultiple([
      PERMISSIONS.IOS.PHOTO_LIBRARY,
      PERMISSIONS.IOS.CAMERA,
    ]).then((statuses) => {
      if (
        needAccessStatus.includes(
          statuses[(PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.CAMERA)],
        )
      ) {
        return false;
      }
      return true;
    });
    return permissionStatus;
  } else {
    permissionStatus = await checkMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      permissionStorageAndroid,
    ]).then((statuses) => {
      if (
        needAccessStatus.includes(statuses[PERMISSIONS.ANDROID.CAMERA]) ||
        needAccessStatus.includes(statuses[permissionStorageAndroid])
      ) {
        return false;
      }
      return true;
    });
    return permissionStatus;
  }
}

export async function requestPermission(
  permission,
  shouldGoToSetting = true,
  ignoreFalseifOneGranted,
) {
  if (isWeb) {
    const results = await Promise.all(
      permission.map(async (perm) => {
        const webPerm = perm.includes('CAMERA')
          ? WEB_PERMISSIONS.CAMERA
          : perm.includes('LOCATION')
          ? WEB_PERMISSIONS.LOCATION
          : null;

        if (!webPerm) return RESULTS.UNAVAILABLE;
        return await requestWebPermission(webPerm);
      }),
    );

    const listPermission = results.map((status, index) => ({
      permissionType: permission[index],
      permissionStatus: status,
    }));

    return {
      listPermission,
      isHasRejectedPermission: results.some((r) => r === RESULTS.DENIED),
      isHasBlockedPermission: results.some((r) => r === RESULTS.BLOCKED),
    };
  }

  let finalResult = null;
  const result = await requestMultiple(permission).then((result) => {
    let permissionType;
    let permissionStatus;
    let isHasRejectedPermission = false;
    let isHasBlockedPermission = false;
    const listPermission = [];
    for (let i = 0; i < permission.length; i++) {
      const status = result[permission[i]];
      if (status === RESULTS.UNAVAILABLE) {
        permissionType = permission[0];
        permissionStatus = status;
        isHasRejectedPermission = true;
      } else if (status === RESULTS.BLOCKED) {
        permissionType = permission[0];
        permissionStatus = status;
        isHasBlockedPermission = true;
      } else if (status === RESULTS.DENIED) {
        permissionType = permission[0];
        permissionStatus = status;
        isHasRejectedPermission = true;
      } else if ([RESULTS.GRANTED, RESULTS.LIMITED].includes(status)) {
        permissionType = permission[0];
        permissionStatus = status;
      }
      listPermission.push({
        permissionType,
        permissionStatus,
      });
    }
    return {
      listPermission,
      isHasRejectedPermission,
      isHasBlockedPermission,
    };
  });
  finalResult = result;
  if (ignoreFalseifOneGranted) {
    const isGrantedData = result?.listPermission?.filter(
      (item) => item.permissionStatus === 'granted',
    );
    if (isGrantedData?.length === 0) {
      if (
        shouldGoToSetting &&
        (Platform.OS === 'ios' || Platform.OS === 'android')
      ) {
        try {
          await openSettings();
        } catch (error) {
          console.warn('Failed to open settings:', error);
        }
      }
    } else {
      finalResult = {
        ...result,
        isHasBlockedPermission: false,
      };
    }
  } else if (result.isHasBlockedPermission) {
    if (
      shouldGoToSetting &&
      (Platform.OS === 'ios' || Platform.OS === 'android')
    ) {
      try {
        await openSettings();
      } catch (error) {
        console.warn('Failed to open settings:', error);
      }
    }
  }
  return finalResult;
}
