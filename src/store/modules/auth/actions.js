export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = 'http://localhost:5002/api/auth/login';

    if (mode === 'signup') {
      url = 'http://localhost:5002/api/auth/register';
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mail: payload.email,
        password: payload.password,
        type: payload.type,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.token);
    localStorage.setItem('userId', responseData.userId);
    localStorage.setItem('userType', responseData.type);
    localStorage.setItem('tokenExpiration', expirationDate);

    const userDetails = {
      token: responseData.token,
      userId: responseData.userId,
      type: responseData.type,
    };
    context.commit('setUser', userDetails);
    if (userDetails.type === 'doctor') context.commit('setIsDoctor', true);

    return userDetails;
  },

  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');

    if (token && userId && userType) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        type: userType,
      });

      if (userType === 'doctor') context.commit('setIsDoctor', true);

      return {
        token: token,
        userId: userId,
        type: userType,
      };
    }
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('tokenExpiration');

    context.commit('setUser', {
      token: null,
      userId: null,
      type: null,
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
