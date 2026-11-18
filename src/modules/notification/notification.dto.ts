export interface ISaveFcmTokenDto {
  fcmToken: string;
}
export interface ISendNotificationDto {
  targetUserId: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}
