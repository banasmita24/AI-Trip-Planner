import { chatSession } from '../src/service/AiModel';

describe('AI Model Integration', () => {
  it('should configure the AI Model', () => {
    expect(chatSession).toBeDefined();
  });
});