import { processError } from '../index';

// Mock i18n
jest.mock('../i18n', () => ({
  t: jest.fn((key: string, fallback: string) => fallback),
}));

describe('processError', () => {
  it('should extract error code and message from backend response', () => {
    const mockError = {
      response: {
        data: {
          message: 'User not found.',
          error: {
            code: 'USER_NOT_FOUND',
          },
        },
      },
    };

    try {
      processError(mockError);
    } catch (error: any) {
      expect(error.message).toBe('User not found.');
      expect(error.code).toBe('USER_NOT_FOUND');
    }
  });

  it('should handle errors without error code', () => {
    const mockError = {
      response: {
        data: {
          message: 'Something went wrong.',
        },
      },
    };

    try {
      processError(mockError);
    } catch (error: any) {
      expect(error.message).toBe('Something went wrong.');
      expect(error.code).toBeUndefined();
    }
  });

  it('should use fallback message when no message is provided', () => {
    const mockError = {};

    try {
      processError(mockError, 'Custom fallback');
    } catch (error: any) {
      expect(error.message).toBe('Custom fallback');
      expect(error.code).toBeUndefined();
    }
  });

  it('should handle axios error structure', () => {
    const mockError = {
      response: {
        data: {
          success: false,
          statusCode: 404,
          message: 'User not found.',
          error: {
            code: 'USER_NOT_FOUND',
          },
          timestamp: '2026-01-08T17:29:27.991Z',
        },
      },
    };

    try {
      processError(mockError);
    } catch (error: any) {
      expect(error.message).toBe('User not found.');
      expect(error.code).toBe('USER_NOT_FOUND');
    }
  });
});
