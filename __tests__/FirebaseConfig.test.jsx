//Ensure Firebase is initialized correctly.
import { app, db } from '../src/service/firebaseConfig';

describe('Firebase Configuration', () => {
  it('should initialize Firebase app', () => {
    expect(app).toBeDefined();
  });

  it('should initialize Firestore database', () => {
    expect(db).toBeDefined();
  });
});