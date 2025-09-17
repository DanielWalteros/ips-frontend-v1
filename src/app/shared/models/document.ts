export interface Document {
  id: string;
  title: string;
  downloadUrl: string;
  type: 'transparency' | 'epidemiological' | 'financial' | 'privacy';
  isAvailable: boolean;
}
