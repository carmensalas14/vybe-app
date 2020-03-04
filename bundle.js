(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a }
        var p = n[i] = { exports: {} };
        e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t)
      }
      return n[i].exports
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o
  }
  return r
})()({
    1: [function (require, module, exports) {
        // app.js code starts here 
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        const SpotifyWebApi = require('spotify-web-api-node');
        const client_id = `325321fbe95244a79af7e14e52867182`
        const clientSecret = `YTBmNGJlZTlhYTEyNDFhNTkxNmRhYWZkN2I3YTFlZjQ=`
        const redirectUri = `https%3A%2F%2Fcarmensalas14.github.io%2Fvybe-app%2F`
        const token = `"BQCKOjASc7lqut1UQd5bq8qbHZA9yZQlYFJN64HgqG3fdzMTpJ_45oS9MpMY70JQdJSuSjtThJQNxD9HTsUgv4PVwT1o1NzgLO5n9vbgQkvFF81JglGo5DPhrtDoh1Do6-1uvpb58JV5n18KRpK6XWTYupk`
        const implicitAuthorization = `https://accounts.spotify.com/authorize?client_id=325321fbe95244a79af7e14e52867182&redirect_uri=https%3A%2F%2Fcarmensalas14.github.io%2Fvybe-app%2F&scope=user-read-private%20user-read-email&response_type=token&state=123`

        const params = new URLSearchParams(window.location.hash);
        const accessToken = params.get("#access_token");
        console.log(accessToken)
        // credentials are optional
        const spotifyApi = new SpotifyWebApi({
          clientId: client_id,
          clientSecret: clientSecret,
          redirectUri: redirectUri
        });

        const getUserSavedTracks = async function () {
          const response = await fetch('https://api.spotify.com/v1/me/tracks', {
            headers: {
              'Authorization': 'Bearer ' + accessToken
            }
          });

          const json = await response.json();
        }
    }



    spotifyApi.setAccessToken(token);
    spotifyApi.getUserPlaylists('user_id')
      .then(function (data) {
        console.log('User playlists', data);
      }, function (err) {
        console.error(err);
      });

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    },
    { "spotify-web-api-node": 5 }],
  2: [function (require, module, exports) {

    /**
     * Expose `Emitter`.
     */

    if (typeof module !== 'undefined') {
      module.exports = Emitter;
    }

    /**
     * Initialize a new `Emitter`.
     *
     * @api public
     */

    function Emitter(obj) {
      if (obj) return mixin(obj);
    };

    /**
     * Mixin the emitter properties.
     *
     * @param {Object} obj
     * @return {Object}
     * @api private
     */

    function mixin(obj) {
      for (var key in Emitter.prototype) {
        obj[key] = Emitter.prototype[key];
      }
      return obj;
    }

    /**
     * Listen on the given `event` with `fn`.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */

    Emitter.prototype.on =
      Emitter.prototype.addEventListener = function (event, fn) {
        this._callbacks = this._callbacks || {};
        (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
        .push(fn);
        return this;
      };

    /**
     * Adds an `event` listener that will be invoked a single
     * time then automatically removed.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */

    Emitter.prototype.once = function (event, fn) {
      function on() {
        this.off(event, on);
        fn.apply(this, arguments);
      }

      on.fn = fn;
      this.on(event, on);
      return this;
    };

    /**
     * Remove the given callback for `event` or all
     * registered callbacks.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */

    Emitter.prototype.off =
      Emitter.prototype.removeListener =
      Emitter.prototype.removeAllListeners =
      Emitter.prototype.removeEventListener = function (event, fn) {
        this._callbacks = this._callbacks || {};

        // all
        if (0 == arguments.length) {
          this._callbacks = {};
          return this;
        }

        // specific event
        var callbacks = this._callbacks['$' + event];
        if (!callbacks) return this;

        // remove all handlers
        if (1 == arguments.length) {
          delete this._callbacks['$' + event];
          return this;
        }

        // remove specific handler
        var cb;
        for (var i = 0; i < callbacks.length; i++) {
          cb = callbacks[i];
          if (cb === fn || cb.fn === fn) {
            callbacks.splice(i, 1);
            break;
          }
        }

        // Remove event specific arrays for event types that no
        // one is subscribed for to avoid memory leak.
        if (callbacks.length === 0) {
          delete this._callbacks['$' + event];
        }

        return this;
      };

    /**
     * Emit `event` with the given args.
     *
     * @param {String} event
     * @param {Mixed} ...
     * @return {Emitter}
     */

    Emitter.prototype.emit = function (event) {
      this._callbacks = this._callbacks || {};

      var args = new Array(arguments.length - 1),
        callbacks = this._callbacks['$' + event];

      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }

      if (callbacks) {
        callbacks = callbacks.slice(0);
        for (var i = 0, len = callbacks.length; i < len; ++i) {
          callbacks[i].apply(this, args);
        }
      }

      return this;
    };

    /**
     * Return array of callbacks for `event`.
     *
     * @param {String} event
     * @return {Array}
     * @api public
     */

    Emitter.prototype.listeners = function (event) {
      this._callbacks = this._callbacks || {};
      return this._callbacks['$' + event] || [];
    };

    /**
     * Check if this emitter has `event` handlers.
     *
     * @param {String} event
     * @return {Boolean}
     * @api public
     */

    Emitter.prototype.hasListeners = function (event) {
      return !!this.listeners(event).length;
    };

}, {}],
  3: [function (require, module, exports) {
    'use strict';

    var Request = require('./base-request');

    var DEFAULT_HOST = 'accounts.spotify.com',
      DEFAULT_PORT = 443,
      DEFAULT_SCHEME = 'https';

    module.exports.builder = function () {
      return Request.builder()
        .withHost(DEFAULT_HOST)
        .withPort(DEFAULT_PORT)
        .withScheme(DEFAULT_SCHEME);
    };

}, { "./base-request": 4 }],
  4: [function (require, module, exports) {
    'use strict';

    var Request = function (builder) {
      if (!builder) {
        throw new Error('No builder supplied to constructor');
      }

      this.host = builder.host;
      this.port = builder.port;
      this.scheme = builder.scheme;
      this.queryParameters = builder.queryParameters;
      this.bodyParameters = builder.bodyParameters;
      this.headers = builder.headers;
      this.path = builder.path;
    };

    Request.prototype._getter = function (key) {
      return function () {
        return this[key];
      };
    };

    Request.prototype.getHost = Request.prototype._getter('host');

    Request.prototype.getPort = Request.prototype._getter('port');

    Request.prototype.getScheme = Request.prototype._getter('scheme');

    Request.prototype.getPath = Request.prototype._getter('path');

    Request.prototype.getQueryParameters = Request.prototype._getter(
      'queryParameters'
    );

    Request.prototype.getBodyParameters = Request.prototype._getter(
      'bodyParameters'
    );

    Request.prototype.getHeaders = Request.prototype._getter('headers');

    Request.prototype.getURI = function () {
      if (!this.scheme || !this.host || !this.port) {
        throw new Error('Missing components necessary to construct URI');
      }
      var uri = this.scheme + '://' + this.host;
      if (
        (this.scheme === 'http' && this.port !== 80) ||
        (this.scheme === 'https' && this.port !== 443)
      ) {
        uri += ':' + this.port;
      }
      if (this.path) {
        uri += this.path;
      }
      return uri;
    };

    Request.prototype.getURL = function () {
      var uri = this.getURI();
      if (this.getQueryParameters()) {
        return uri + this.getQueryParameterString(this.getQueryParameters());
      }
      else {
        return uri;
      }
    };

    Request.prototype.getQueryParameterString = function () {
      var queryParameters = this.getQueryParameters();
      if (queryParameters) {
        return (
          '?' +
          Object.keys(queryParameters)
          .filter(function (key) {
            return queryParameters[key] !== undefined;
          })
          .map(function (key) {
            return key + '=' + queryParameters[key];
          })
          .join('&')
        );
      }
    };

    Request.prototype.execute = function (method, callback) {
      if (callback) {
        method(this, callback);
        return;
      }
      var _self = this;

      return new Promise(function (resolve, reject) {
        method(_self, function (error, result) {
          if (error) {
            reject(error);
          }
          else {
            resolve(result);
          }
        });
      });
    };

    var Builder = function () {};

    Builder.prototype._setter = function (key) {
      return function (value) {
        this[key] = value;
        return this;
      };
    };

    Builder.prototype.withHost = Builder.prototype._setter('host');

    Builder.prototype.withPort = Builder.prototype._setter('port');

    Builder.prototype.withScheme = Builder.prototype._setter('scheme');

    Builder.prototype.withPath = Builder.prototype._setter('path');

    Builder.prototype._assigner = function (key) {
      return function () {
        for (var i = 0; i < arguments.length; i++) {
          this[key] = this._assign(this[key], arguments[i]);
        }
        return this;
      };
    };

    Builder.prototype.withQueryParameters = Builder.prototype._assigner(
      'queryParameters'
    );

    Builder.prototype.withBodyParameters = Builder.prototype._assigner(
      'bodyParameters'
    );

    Builder.prototype.withHeaders = Builder.prototype._assigner('headers');

    Builder.prototype.withAuth = function (accessToken) {
      if (accessToken) {
        this.withHeaders({ Authorization: 'Bearer ' + accessToken });
      }
      return this;
    };

    Builder.prototype._assign = function (src, obj) {
      if (obj && Array.isArray(obj)) {
        return obj;
      }
      if (obj && Object.keys(obj).length > 0) {
        return Object.assign(src || {}, obj);
      }
      return src;
    };

    Builder.prototype.build = function () {
      return new Request(this);
    };

    module.exports.builder = function () {
      return new Builder();
    };

}, {}],
  5: [function (require, module, exports) {
    module.exports = require('./spotify-web-api');

}, { "./spotify-web-api": 7 }],
  6: [function (require, module, exports) {
    'use strict';

    var superagent = require('superagent'),
      WebApiError = require('./webapi-error');

    var HttpManager = {};

    /* Create superagent options from the base request */
    var _getParametersFromRequest = function (request) {
      var options = {};

      if (request.getQueryParameters()) {
        options.query = request.getQueryParameters();
      }

      if (
        request.getHeaders() &&
        request.getHeaders()['Content-Type'] === 'application/json'
      ) {
        options.data = JSON.stringify(request.getBodyParameters());
      }
      else if (request.getBodyParameters()) {
        options.data = request.getBodyParameters();
      }

      if (request.getHeaders()) {
        options.headers = request.getHeaders();
      }
      return options;
    };

    /* Create an error object from an error returned from the Web API */
    var _getErrorObject = function (defaultMessage, err) {
      var errorObject;
      if (typeof err.error === 'object' && typeof err.error.message === 'string') {
        // Web API Error format
        errorObject = new WebApiError(err.error.message, err.error.status);
      }
      else if (typeof err.error === 'string') {
        // Authorization Error format
        /* jshint ignore:start */
        errorObject = new WebApiError(err.error + ': ' + err['error_description']);
        /* jshint ignore:end */
      }
      else if (typeof err === 'string') {
        // Serialized JSON error
        try {
          var parsedError = JSON.parse(err);
          errorObject = new WebApiError(
            parsedError.error.message,
            parsedError.error.status
          );
        }
        catch (err) {
          // Error not JSON formatted
        }
      }

      if (!errorObject) {
        // Unexpected format
        errorObject = new WebApiError(defaultMessage + ': ' + JSON.stringify(err));
      }

      return errorObject;
    };

    /* Make the request to the Web API */
    HttpManager._makeRequest = function (method, options, uri, callback) {
      var req = method.bind(superagent)(uri);

      if (options.query) {
        req.query(options.query);
      }

      if (
        options.data &&
        (!options.headers || options.headers['Content-Type'] !== 'application/json')
      ) {
        req.type('form');
        req.send(options.data);
      }
      else if (options.data) {
        req.send(options.data);
      }

      if (options.headers) {
        req.set(options.headers);
      }

      req.end(function (err, response) {
        if (err) {
          var errorObject = _getErrorObject('Request error', {
            error: err
          });
          return callback(errorObject);
        }

        return callback(null, {
          body: response.body,
          headers: response.headers,
          statusCode: response.statusCode
        });
      });
    };

    /**
     * Make a HTTP GET request.
     * @param {BaseRequest} The request.
     * @param {Function} The callback function.
     */
    HttpManager.get = function (request, callback) {
      var options = _getParametersFromRequest(request);
      var method = superagent.get;

      HttpManager._makeRequest(method, options, request.getURI(), callback);
    };

    /**
     * Make a HTTP POST request.
     * @param {BaseRequest} The request.
     * @param {Function} The callback function.
     */
    HttpManager.post = function (request, callback) {
      var options = _getParametersFromRequest(request);
      var method = superagent.post;

      HttpManager._makeRequest(method, options, request.getURI(), callback);
    };

    /**
     * Make a HTTP DELETE request.
     * @param {BaseRequest} The request.
     * @param {Function} The callback function.
     */
    HttpManager.del = function (request, callback) {
      var options = _getParametersFromRequest(request);
      var method = superagent.del;

      HttpManager._makeRequest(method, options, request.getURI(), callback);
    };

    /**
     * Make a HTTP PUT request.
     * @param {BaseRequest} The request.
     * @param {Function} The callback function.
     */
    HttpManager.put = function (request, callback) {
      var options = _getParametersFromRequest(request);
      var method = superagent.put;

      HttpManager._makeRequest(method, options, request.getURI(), callback);
    };

    module.exports = HttpManager;

}, { "./webapi-error": 8, "superagent": 11 }],
  7: [function (require, module, exports) {
    'use strict';

    var AuthenticationRequest = require('./authentication-request'),
      WebApiRequest = require('./webapi-request'),
      HttpManager = require('./http-manager');

    function SpotifyWebApi(credentials) {
      this._credentials = credentials || {};
    }

    SpotifyWebApi.prototype = {
      setCredentials: function (credentials) {
        for (var key in credentials) {
          if (credentials.hasOwnProperty(key)) {
            this._credentials[key] = credentials[key];
          }
        }
      },

      getCredentials: function () {
        return this._credentials;
      },

      resetCredentials: function () {
        this._credentials = null;
      },

      setClientId: function (clientId) {
        this._setCredential('clientId', clientId);
      },

      setClientSecret: function (clientSecret) {
        this._setCredential('clientSecret', clientSecret);
      },

      setAccessToken: function (accessToken) {
        this._setCredential('accessToken', accessToken);
      },

      setRefreshToken: function (refreshToken) {
        this._setCredential('refreshToken', refreshToken);
      },

      setRedirectURI: function (redirectUri) {
        this._setCredential('redirectUri', redirectUri);
      },

      getRedirectURI: function () {
        return this._getCredential('redirectUri');
      },

      getClientId: function () {
        return this._getCredential('clientId');
      },

      getClientSecret: function () {
        return this._getCredential('clientSecret');
      },

      getAccessToken: function () {
        return this._getCredential('accessToken');
      },

      getRefreshToken: function () {
        return this._getCredential('refreshToken');
      },

      resetClientId: function () {
        this._resetCredential('clientId');
      },

      resetClientSecret: function () {
        this._resetCredential('clientSecret');
      },

      resetAccessToken: function () {
        this._resetCredential('accessToken');
      },

      resetRefreshToken: function () {
        this._resetCredential('refreshToken');
      },

      resetRedirectURI: function () {
        this._resetCredential('redirectUri');
      },

      _setCredential: function (credentialKey, value) {
        this._credentials = this._credentials || {};
        this._credentials[credentialKey] = value;
      },

      _getCredential: function (credentialKey) {
        if (!this._credentials) {
          return;
        }
        else {
          return this._credentials[credentialKey];
        }
      },

      _resetCredential: function (credentialKey) {
        if (!this._credentials) {
          return;
        }
        else {
          this._credentials[credentialKey] = null;
        }
      },

      /**
       * Look up a track.
       * @param {string} trackId The track's ID.
       * @param {Object} [options] The possible options, currently only market.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getTrack('3Qm86XLflmIXVm1wcwkgDK').then(...)
       * @returns {Promise|undefined} A promise that if successful, returns an object containing information
       *          about the track. Not returned if a callback is given.
       */
      getTrack: function (trackId, options, callback) {
        // In case someone is using a version where options parameter did not exist.
        var actualCallback, actualOptions;
        if (typeof options === 'function' && !callback) {
          actualCallback = options;
          actualOptions = {};
        }
        else {
          actualCallback = callback;
          actualOptions = options;
        }

        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/tracks/' + trackId)
          .withQueryParameters(actualOptions)
          .build()
          .execute(HttpManager.get, actualCallback);
      },

      /**
       * Look up several tracks.
       * @param {string[]} trackIds The IDs of the artists.
       * @param {Object} [options] The possible options, currently only market.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getArtists(['0oSGxfWSnnOXhD2fKuz2Gy', '3dBVyJ7JuOMt4GE9607Qin']).then(...)
       * @returns {Promise|undefined} A promise that if successful, returns an object containing information
       *          about the artists. Not returned if a callback is given.
       */
      getTracks: function (trackIds, options, callback) {
        // In case someone is using a version where options parameter did not exist.
        var actualCallback, actualOptions;
        if (typeof options === 'function' && !callback) {
          actualCallback = options;
          actualOptions = {};
        }
        else {
          actualCallback = callback;
          actualOptions = options;
        }

        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/tracks')
          .withQueryParameters({
              ids: trackIds.join(',')
            },
            actualOptions
          )
          .build()
          .execute(HttpManager.get, actualCallback);
      },

      /**
       * Look up an album.
       * @param {string} albumId The album's ID.
       * @param {Object} [options] The possible options, currently only market.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getAlbum('0sNOF9WDwhWunNAHPD3Baj').then(...)
       * @returns {Promise|undefined} A promise that if successful, returns an object containing information
       *          about the album. Not returned if a callback is given.
       */
      getAlbum: function (albumId, options, callback) {
        // In case someone is using a version where options parameter did not exist.
        var actualCallback, actualOptions;
        if (typeof options === 'function' && !callback) {
          actualCallback = options;
          actualOptions = {};
        }
        else {
          actualCallback = callback;
          actualOptions = options;
        }

        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/albums/' + albumId)
          .withQueryParameters(actualOptions)
          .build()
          .execute(HttpManager.get, actualCallback);
      },

      /**
       * Look up several albums.
       * @param {string[]} albumIds The IDs of the albums.
       * @param {Object} [options] The possible options, currently only market.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getAlbums(['0oSGxfWSnnOXhD2fKuz2Gy', '3dBVyJ7JuOMt4GE9607Qin']).then(...)
       * @returns {Promise|undefined} A promise that if successful, returns an object containing information
       *          about the albums. Not returned if a callback is given.
       */
      getAlbums: function (albumIds, options, callback) {
        // In case someone is using a version where options parameter did not exist.
        var actualCallback, actualOptions;
        if (typeof options === 'function' && !callback) {
          actualCallback = options;
          actualOptions = {};
        }
        else {
          actualCallback = callback;
          actualOptions = options;
        }

        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/albums')
          .withQueryParameters({
              ids: albumIds.join(',')
            },
            actualOptions
          )
          .build()
          .execute(HttpManager.get, actualCallback);
      },

      /**
       * Look up an artist.
       * @param {string} artistId The artist's ID.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example api.getArtist('1u7kkVrr14iBvrpYnZILJR').then(...)
       * @returns {Promise|undefined} A promise that if successful, returns an object containing information
       *          about the artist. Not returned if a callback is given.
       */
      getArtist: function (artistId, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/artists/' + artistId)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Look up several artists.
       * @param {string[]} artistIds The IDs of the artists.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getArtists(['0oSGxfWSnnOXhD2fKuz2Gy', '3dBVyJ7JuOMt4GE9607Qin']).then(...)
       * @returns {Promise|undefined} A promise that if successful, returns an object containing information
       *          about the artists. Not returned if a callback is given.
       */
      getArtists: function (artistIds, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/artists')
          .withQueryParameters({
            ids: artistIds.join(',')
          })
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Search for music entities of certain types.
       * @param {string} query The search query.
       * @param {string[]} types An array of item types to search across.
       * Valid types are: 'album', 'artist', 'playlist', and 'track'.
       * @param {Object} [options] The possible options, e.g. limit, offset.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example search('Abba', ['track', 'playlist'], { limit : 5, offset : 1 }).then(...)
       * @returns {Promise|undefined} A promise that if successful, returns an object containing the
       *          search results. The result is paginated. If the promise is rejected,
       *          it contains an error object. Not returned if a callback is given.
       */
      search: function (query, types, options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/search/')
          .withQueryParameters({
              type: types.join(','),
              q: query
            },
            options
          )
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Search for an album.
       * @param {string} query The search query.
       * @param {Object} [options] The possible options, e.g. limit, offset.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example searchAlbums('Space Oddity', { limit : 5, offset : 1 }).then(...)
       * @returns {Promise|undefined} A promise that if successful, returns an object containing the
       *          search results. The result is paginated. If the promise is rejected,
       *          it contains an error object. Not returned if a callback is given.
       */
      searchAlbums: function (query, options, callback) {
        return this.search(query, ['album'], options, callback);
      },

      /**
       * Search for an artist.
       * @param {string} query The search query.
       * @param {Object} [options] The possible options, e.g. limit, offset.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example searchArtists('David Bowie', { limit : 5, offset : 1 }).then(...)
       * @returns {Promise|undefined} A promise that if successful, returns an object containing the
       *          search results. The result is paginated. If the promise is rejected,
       *          it contains an error object. Not returned if a callback is given.
       */
      searchArtists: function (query, options, callback) {
        return this.search(query, ['artist'], options, callback);
      },

      /**
       * Search for a track.
       * @param {string} query The search query.
       * @param {Object} [options] The possible options, e.g. limit, offset.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example searchTracks('Mr. Brightside', { limit : 3, offset : 2 }).then(...)
       * @returns {Promise|undefined} A promise that if successful, returns an object containing the
       *          search results. The result is paginated. If the promise is rejected,
       *          it contains an error object. Not returned if a callback is given.
       */
      searchTracks: function (query, options, callback) {
        return this.search(query, ['track'], options, callback);
      },

      /**
       * Search for playlists.
       * @param {string} query The search query.
       * @param {Object} options The possible options.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example searchPlaylists('workout', { limit : 1, offset : 0 }).then(...)
       * @returns {Promise|undefined} A promise that if successful, returns an object containing the
       *          search results. The result is paginated. If the promise is rejected,
       *          it contains an error object. Not returned if a callback is given.
       */
      searchPlaylists: function (query, options, callback) {
        return this.search(query, ['playlist'], options, callback);
      },

      /**
       * Get an artist's albums.
       * @param {string} artistId The artist's ID.
       * @options {Object} [options] The possible options, e.g. limit, offset.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getArtistAlbums('0oSGxfWSnnOXhD2fKuz2Gy', { album_type : 'album', country : 'GB', limit : 2, offset : 5 }).then(...)
       * @returns {Promise|undefined} A promise that if successful, returns an object containing the albums
       *          for the given artist. The result is paginated. If the promise is rejected,
       *          it contains an error object. Not returned if a callback is given.
       */
      getArtistAlbums: function (artistId, options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/artists/' + artistId + '/albums')
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get the tracks of an album.
       * @param albumId the album's ID.
       * @options {Object} [options] The possible options, e.g. limit.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getAlbumTracks('41MnTivkwTO3UUJ8DrqEJJ', { limit : 5, offset : 1 }).then(...)
       * @returns {Promise|undefined} A promise that if successful, returns an object containing the
       *                    tracks in the album. The result is paginated. If the promise is rejected.
       *                    it contains an error object. Not returned if a callback is given.
       */
      getAlbumTracks: function (albumId, options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/albums/' + albumId + '/tracks')
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get an artist's top tracks.
       * @param {string} artistId The artist's ID.
       * @param {string} country The country/territory where the tracks are most popular. (format: ISO 3166-1 alpha-2)
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getArtistTopTracks('0oSGxfWSnnOXhD2fKuz2Gy', 'GB').then(...)
       * @returns {Promise|undefined} A promise that if successful, returns an object containing the
       *          artist's top tracks in the given country. If the promise is rejected,
       *          it contains an error object. Not returned if a callback is given.
       */
      getArtistTopTracks: function (artistId, country, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/artists/' + artistId + '/top-tracks')
          .withQueryParameters({
            country: country
          })
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get related artists.
       * @param {string} artistId The artist's ID.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getArtistRelatedArtists('0oSGxfWSnnOXhD2fKuz2Gy').then(...)
       * @returns {Promise|undefined} A promise that if successful, returns an object containing the
       *          related artists. If the promise is rejected, it contains an error object. Not returned if a callback is given.
       */
      getArtistRelatedArtists: function (artistId, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/artists/' + artistId + '/related-artists')
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get information about a user.
       * @param userId The user ID.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getUser('thelinmichael').then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves to an object
       *          containing information about the user. If the promise is
       *          rejected, it contains an error object. Not returned if a callback is given.
       */
      getUser: function (userId, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/users/' + encodeURIComponent(userId))
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get information about the user that has signed in (the current user).
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getMe().then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves to an object
       *          containing information about the user. The amount of information
       *          depends on the permissions given by the user. If the promise is
       *          rejected, it contains an error object. Not returned if a callback is given.
       */
      getMe: function (callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me')
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get a user's playlists.
       * @param {string} userId An optional id of the user. If you know the Spotify URI it is easy
       * to find the id (e.g. spotify:user:<here_is_the_id>). If not provided, the id of the user that granted
       * the permissions will be used.
       * @param {Object} [options] The options supplied to this request.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getUserPlaylists('thelinmichael').then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves to an object containing
       *          a list of playlists. If rejected, it contains an error object. Not returned if a callback is given.
       */
      getUserPlaylists: function (userId, options, callback) {
        var path;
        if (typeof userId === 'string') {
          path = '/v1/users/' + encodeURIComponent(userId) + '/playlists';
        }
        else if (typeof userId === 'object') {
          callback = options;
          options = userId;
          path = '/v1/me/playlists';
        } /* undefined */
        else {
          path = '/v1/me/playlists';
        }

        return WebApiRequest.builder(this.getAccessToken())
          .withPath(path)
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get a playlist.
       * @param {string} playlistId The playlist's ID.
       * @param {Object} [options] The options supplied to this request.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getPlaylist('thelinmichael', '3EsfV6XzCHU8SPNdbnFogK').then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves to an object containing
       *          the playlist. If rejected, it contains an error object. Not returned if a callback is given.
       */
      getPlaylist: function (playlistId, options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/playlists/' + playlistId)
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get tracks in a playlist.
       * @param {string} playlistId The playlist's ID.
       * @param {Object} [options] Optional options, such as fields.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getPlaylistTracks('thelinmichael', '3ktAYNcRHpazJ9qecm3ptn').then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves to an object that containing
       * the tracks in the playlist. If rejected, it contains an error object. Not returned if a callback is given.
       */
      getPlaylistTracks: function (playlistId, options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/playlists/' + playlistId + '/tracks')
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Create a playlist.
       * @param {string} userId The playlist's owner's user ID.
       * @param {string} playlistName The name of the playlist.
       * @param {Object} [options] The possible options, currently only public.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example createPlaylist('thelinmichael', 'My cool playlist!', { public : false }).then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves to an object containing information about the
       *          created playlist. If rejected, it contains an error object. Not returned if a callback is given.
       */
      createPlaylist: function (userId, playlistName, options, callback) {
        // In case someone is using a version where options parameter did not exist.
        var actualCallback;
        if (typeof options === 'function' && !callback) {
          actualCallback = options;
        }
        else {
          actualCallback = callback;
        }

        var actualOptions = { name: playlistName };
        if (typeof options === 'object') {
          Object.keys(options).forEach(function (key) {
            actualOptions[key] = options[key];
          });
        }

        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/users/' + encodeURIComponent(userId) + '/playlists')
          .withHeaders({ 'Content-Type': 'application/json' })
          .withBodyParameters(actualOptions)
          .build()
          .execute(HttpManager.post, actualCallback);
      },

      /**
       * Follow a playlist.
       * @param {string} playlistId The playlist's ID
       * @param {Object} [options] The possible options, currently only public.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
       * it contains an error object. Not returned if a callback is given.
       */
      followPlaylist: function (playlistId, options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/playlists/' + playlistId + '/followers')
          .withHeaders({ 'Content-Type': 'application/json' })
          .withBodyParameters(options)
          .build()
          .execute(HttpManager.put, callback);
      },

      /**
       * Unfollow a playlist.
       * @param {string} playlistId The playlist's ID
       * @param {Object} [options] The possible options, currently only public.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
       * it contains an error object. Not returned if a callback is given.
       */
      unfollowPlaylist: function (playlistId, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/playlists/' + playlistId + '/followers')
          .withHeaders({ 'Content-Type': 'application/json' })
          .build()
          .execute(HttpManager.del, callback);
      },

      /**
       * Change playlist details.
       * @param {string} playlistId The playlist's ID
       * @param {Object} [options] The possible options, e.g. name, public.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example changePlaylistDetails('thelinmichael', '3EsfV6XzCHU8SPNdbnFogK', {name: 'New name', public: true}).then(...)
       * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
       * it contains an error object. Not returned if a callback is given.
       */
      changePlaylistDetails: function (playlistId, options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/playlists/' + playlistId)
          .withHeaders({ 'Content-Type': 'application/json' })
          .withBodyParameters(options)
          .build()
          .execute(HttpManager.put, callback);
      },

      /**
       * Replace the image used to represent a specific playlist.
       * @param {string} playlistId The playlist's ID
       * @param {string} base64URI Base64 encoded JPEG image data, maximum payload size is 256 KB
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example uploadCustomPlaylistCoverImage('thelinmichael', '3EsfV6XzCHU8SPNdbnFogK', 'longbase64uri').then(...)
       * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
       * it contains an error object. Not returned if a callback is given.
       */
      uploadCustomPlaylistCoverImage: function (playlistId, base64URI, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/playlists/' + playlistId + '/images')
          .withHeaders({ 'Content-Type': 'image/jpeg' })
          .withBodyParameters(base64URI)
          .build()
          .execute(HttpManager.put, callback);
      },

      /**
       * Add tracks to a playlist.
       * @param {string} playlistId The playlist's ID
       * @param {string[]} tracks URIs of the tracks to add to the playlist.
       * @param {Object} [options] Options, position being the only one.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example addTracksToPlaylist('thelinmichael', '3EsfV6XzCHU8SPNdbnFogK',
                  '["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]').then(...)
       * @returns {Promise|undefined} A promise that if successful returns an object containing a snapshot_id. If rejected,
       * it contains an error object. Not returned if a callback is given.
       */
      addTracksToPlaylist: function (playlistId, tracks, options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/playlists/' + playlistId + '/tracks')
          .withHeaders({ 'Content-Type': 'application/json' })
          .withQueryParameters(options)
          .withBodyParameters({
            uris: tracks
          })
          .build()
          .execute(HttpManager.post, callback);
      },

      /**
       * Remove tracks from a playlist.
       * @param {string} playlistId The playlist's ID
       * @param {Object[]} tracks An array of objects containing a property called uri with the track URI (String), and
       * a an optional property called positions (int[]), e.g. { uri : "spotify:track:491rM2JN8KvmV6p0oDDuJT", positions : [0, 15] }
       * @param {Object} options Options, snapshot_id being the only one.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful returns an object containing a snapshot_id. If rejected,
       * it contains an error object. Not returned if a callback is given.
       */
      removeTracksFromPlaylist: function (playlistId, tracks, options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/playlists/' + playlistId + '/tracks')
          .withHeaders({ 'Content-Type': 'application/json' })
          .withBodyParameters({
              tracks: tracks
            },
            options
          )
          .build()
          .execute(HttpManager.del, callback);
      },

      /**
       * Remove tracks from a playlist by position instead of specifying the tracks' URIs.
       * @param {string} playlistId The playlist's ID
       * @param {int[]} positions The positions of the tracks in the playlist that should be removed
       * @param {string} snapshot_id The snapshot ID, or version, of the playlist. Required
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful returns an object containing a snapshot_id. If rejected,
       * it contains an error object. Not returned if a callback is given.
       */
      removeTracksFromPlaylistByPosition: function (
        playlistId,
        positions,
        snapshotId,
        callback
      ) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/playlists/' + playlistId + '/tracks')
          .withHeaders({ 'Content-Type': 'application/json' })
          .withBodyParameters({
            positions: positions,
            snapshot_id: snapshotId
          })
          .build()
          .execute(HttpManager.del, callback);
      },

      /**
       * Replace tracks in a playlist.
       * @param {string} playlistId The playlist's ID
       * @param {Object[]} uris An array of track URIs (strings)
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful returns an empty object. If rejected,
       * it contains an error object. Not returned if a callback is given.
       */
      replaceTracksInPlaylist: function (playlistId, uris, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/playlists/' + playlistId + '/tracks')
          .withHeaders({ 'Content-Type': 'application/json' })
          .withBodyParameters({
            uris: uris
          })
          .build()
          .execute(HttpManager.put, callback);
      },

      /**
       * Reorder tracks in a playlist.
       * @param {string} playlistId The playlist's ID
       * @param {int} rangeStart The position of the first track to be reordered.
       * @param {int} insertBefore The position where the tracks should be inserted.
       * @param {Object} options Optional parameters, i.e. range_length and snapshot_id.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful returns an object containing a snapshot_id. If rejected,
       * it contains an error object. Not returned if a callback is given.
       */
      reorderTracksInPlaylist: function (
        playlistId,
        rangeStart,
        insertBefore,
        options,
        callback
      ) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/playlists/' + playlistId + '/tracks')
          .withHeaders({ 'Content-Type': 'application/json' })
          .withBodyParameters({
              range_start: rangeStart,
              insert_before: insertBefore
            },
            options
          )
          .build()
          .execute(HttpManager.put, callback);
      },

      /**
       * Get audio features for a single track identified by its unique Spotify ID.
       * @param {string} trackId The track ID
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getAudioFeaturesForTrack('38P3Q4QcdjQALGF2Z92BmR').then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves to an object
       *          containing information about the audio features. If the promise is
       *          rejected, it contains an error object. Not returned if a callback is given.
       */
      getAudioFeaturesForTrack: function (trackId, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/audio-features/' + trackId)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get audio analysis for a single track identified by its unique Spotify ID.
       * @param {string} trackId The track ID
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getAudioAnalysisForTrack('38P3Q4QcdjQALGF2Z92BmR').then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves to an object
       *          containing information about the audio analysis. If the promise is
       *          rejected, it contains an error object. Not returned if a callback is given.
       */
      getAudioAnalysisForTrack: function (trackId, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/audio-analysis/' + trackId)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get audio features for multiple tracks identified by their unique Spotify ID.
       * @param {string[]} trackIds The track IDs
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getAudioFeaturesForTracks(['38P3Q4QcdjQALGF2Z92BmR', '2HO2bnoMrpnZUbUqiilLHi']).then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves to an object
       *          containing information about the audio features for the tracks. If the promise is
       *          rejected, it contains an error object. Not returned if a callback is given.
       */
      getAudioFeaturesForTracks: function (trackIds, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/audio-features')
          .withQueryParameters({
            ids: trackIds.join(',')
          })
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Create a playlist-style listening experience based on seed artists, tracks and genres.
       * @param {Object} [options] The options supplied to this request.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getRecommendations({ min_energy: 0.4, seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'], min_popularity: 50 }).then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves to an object containing
       *          a list of tracks and a list of seeds. If rejected, it contains an error object. Not returned if a callback is given.
       */
      getRecommendations: function (options, callback) {
        var _opts = {};
        var optionsOfTypeArray = ['seed_artists', 'seed_genres', 'seed_tracks'];
        for (var option in options) {
          if (options.hasOwnProperty(option)) {
            if (
              optionsOfTypeArray.indexOf(option) !== -1 &&
              Object.prototype.toString.call(options[option]) === '[object Array]'
            ) {
              _opts[option] = options[option].join(',');
            }
            else {
              _opts[option] = options[option];
            }
          }
        }

        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/recommendations')
          .withQueryParameters(_opts)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Retrieve a list of available genres seed parameter values for recommendations.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example getAvailableGenreSeeds().then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves to an object containing
       *          a list of available genres to be used as seeds for recommendations.
       *          If rejected, it contains an error object. Not returned if a callback is given.
       */
      getAvailableGenreSeeds: function (callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/recommendations/available-genre-seeds')
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Retrieve a URL where the user can give the application permissions.
       * @param {string[]} scopes The scopes corresponding to the permissions the application needs.
       * @param {string} state A parameter that you can use to maintain a value between the request and the callback to redirect_uri.It is useful to prevent CSRF exploits.
       * @param {boolean} showDialog A parameter that you can use to force the user to approve the app on each login rather than being automatically redirected.
       * @returns {string} The URL where the user can give application permissions.
       */
      createAuthorizeURL: function (scopes, state, showDialog) {
        return AuthenticationRequest.builder()
          .withPath('/authorize')
          .withQueryParameters({
            client_id: this.getClientId(),
            response_type: 'code',
            redirect_uri: this.getRedirectURI(),
            scope: scopes.join('%20'),
            state: state,
            show_dialog: showDialog && !!showDialog
          })
          .build()
          .getURL();
      },

      /**
       * Retrieve the tracks that are saved to the authenticated users Your Music library.
       * @param {Object} [options] Options, being market, limit, and/or offset.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a paging object which in turn contains
       *          playlist track objects. Not returned if a callback is given.
       */
      getMySavedTracks: function (options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/tracks')
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Check if one or more tracks is already saved in the current Spotify user’s “Your Music” library.
       * @param {string[]} trackIds The track IDs
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves into an array of booleans. The order
       * of the returned array's elements correspond to the track ID in the request.
       * The boolean value of true indicates that the track is part of the user's library, otherwise false.
       * Not returned if a callback is given.
       */
      containsMySavedTracks: function (trackIds, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/tracks/contains')
          .withQueryParameters({
            ids: trackIds.join(',')
          })
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Remove a track from the authenticated user's Your Music library.
       * @param {string[]} trackIds The track IDs
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful returns null, otherwise an error.
       * Not returned if a callback is given.
       */
      removeFromMySavedTracks: function (trackIds, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/tracks')
          .withHeaders({ 'Content-Type': 'application/json' })
          .withBodyParameters({ ids: trackIds })
          .build()
          .execute(HttpManager.del, callback);
      },

      /**
       * Add a track from the authenticated user's Your Music library.
       * @param {string[]} trackIds The track IDs
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful returns null, otherwise an error. Not returned if a callback is given.
       */
      addToMySavedTracks: function (trackIds, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/tracks')
          .withHeaders({ 'Content-Type': 'application/json' })
          .withBodyParameters({ ids: trackIds })
          .build()
          .execute(HttpManager.put, callback);
      },

      /**
       * Remove an album from the authenticated user's Your Music library.
       * @param {string[]} albumIds The album IDs
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful returns null, otherwise an error.
       * Not returned if a callback is given.
       */
      removeFromMySavedAlbums: function (albumIds, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/albums')
          .withHeaders({ 'Content-Type': 'application/json' })
          .withBodyParameters(albumIds)
          .build()
          .execute(HttpManager.del, callback);
      },

      /**
       * Add an album from the authenticated user's Your Music library.
       * @param {string[]} albumIds The track IDs
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful returns null, otherwise an error. Not returned if a callback is given.
       */
      addToMySavedAlbums: function (albumIds, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/albums')
          .withHeaders({ 'Content-Type': 'application/json' })
          .withBodyParameters(albumIds)
          .build()
          .execute(HttpManager.put, callback);
      },

      /**
       * Retrieve the albums that are saved to the authenticated users Your Music library.
       * @param {Object} [options] Options, being market, limit, and/or offset.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a paging object which in turn contains
       *          playlist album objects. Not returned if a callback is given.
       */
      getMySavedAlbums: function (options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/albums')
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Check if one or more albums is already saved in the current Spotify user’s “Your Music” library.
       * @param {string[]} albumIds The album IDs
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves into an array of booleans. The order
       * of the returned array's elements correspond to the album ID in the request.
       * The boolean value of true indicates that the album is part of the user's library, otherwise false.
       * Not returned if a callback is given.
       */
      containsMySavedAlbums: function (albumIds, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/albums/contains')
          .withQueryParameters({
            ids: albumIds.join(',')
          })
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get the current user's top artists based on calculated affinity.
       * @param {Object} [options] Options, being time_range, limit, offset.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of artists,
       *          otherwise an error. Not returned if a callback is given.
       */
      getMyTopArtists: function (options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/top/artists')
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get the current user's top tracks based on calculated affinity.
       * @param {Object} [options] Options, being time_range, limit, offset.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
       *          otherwise an error. Not returned if a callback is given.
       */
      getMyTopTracks: function (options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/top/tracks')
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get the Current User's Recently Played Tracks
       * @param {Object} [options] Options, being type, after, limit, before.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
       *          otherwise an error. Not returned if a callback is given.
       */
      getMyRecentlyPlayedTracks: function (options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/player/recently-played')
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get the Current User's Connect Devices
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
       *          otherwise an error. Not returned if a callback is given.
       */
      getMyDevices: function (callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/player/devices')
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get the Current User's Currently Playing Track.
       * @param {Object} [options] Options, being market.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
       *          otherwise an error. Not returned if a callback is given.
       */
      getMyCurrentPlayingTrack: function (options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/player/currently-playing')
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get the Current User's Current Playback State
       * @param {Object} [options] Options, being market.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
       *          otherwise an error. Not returned if a callback is given.
       */
      getMyCurrentPlaybackState: function (options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/player')
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Transfer a User's Playback
       * @param {Object} [options] Options, being market.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
       *          otherwise an error. Not returned if a callback is given.
       */
      transferMyPlayback: function (options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/player')
          .withHeaders({ 'Content-Type': 'application/json' })
          .withBodyParameters({
            device_ids: options.deviceIds,
            play: !!options.play
          })
          .build()
          .execute(HttpManager.put, callback);
      },

      /**
       * Starts o Resumes the Current User's Playback
       * @param {Object} [options] Options, being device_id, context_uri, offset, uris.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example playbackResume({context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr'}).then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
       *          otherwise an error. Not returned if a callback is given.
       */
      play: function (options, callback) {
        /*jshint camelcase: false */
        var _options = options || {};
        var queryParams = _options.device_id ? { device_id: _options.device_id } :
          null;
        var postData = {};
    ['context_uri', 'uris', 'offset'].forEach(function (field) {
          if (field in _options) {
            postData[field] = _options[field];
          }
        });
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/player/play')
          .withQueryParameters(queryParams)
          .withHeaders({ 'Content-Type': 'application/json' })
          .withBodyParameters(postData)
          .build()
          .execute(HttpManager.put, callback);
      },

      /**
       * Pauses the Current User's Playback
       * @param {Object} [options] Options, for now device_id,
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example playbackPause().then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
       *          otherwise an error. Not returned if a callback is given.
       */
      pause: function (options, callback) {
        return (
          WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/player/pause')
          /*jshint camelcase: false */
          .withQueryParameters(
            options && options.device_id ? { device_id: options.device_id } : null
          )
          .withHeaders({ 'Content-Type': 'application/json' })
          .build()
          .execute(HttpManager.put, callback)
        );
      },

      /**
       * Skip the Current User's Playback To Previous Track
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example playbackPrevious().then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
       *          otherwise an error. Not returned if a callback is given.
       */
      skipToPrevious: function (callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/player/previous')
          .withHeaders({ 'Content-Type': 'application/json' })
          .build()
          .execute(HttpManager.post, callback);
      },

      /**
       * Skip the Current User's Playback To Next Track
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example playbackNext().then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
       *          otherwise an error. Not returned if a callback is given.
       */
      skipToNext: function (callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/player/next')
          .withHeaders({ 'Content-Type': 'application/json' })
          .build()
          .execute(HttpManager.post, callback);
      },

      /**
       * Seeks to the given position in the user’s currently playing track.
       *
       * @param {number} positionMs The position in milliseconds to seek to. Must be a positive number.
       * @param {Object} options A JSON object with options that can be passed.
       * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
       * one is the error object (null if no error), and the second is the value if the request succeeded.
       * @return {Object} Null if a callback is provided, a `Promise` object otherwise
       */
      seek: function (positionMs, options, callback) {
        var params = {
          /* jshint camelcase: false */
          position_ms: positionMs
        };
        if (options && 'device_id' in options) {
          /* jshint camelcase: false */
          params.device_id = options.device_id;
        }
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/player/seek')
          .withQueryParameters(params)
          .build()
          .execute(HttpManager.put, callback);
      },

      /**
       * Set Repeat Mode On The Current User's Playback
       * @param {Object} [options] Options, being state (track, context, off).
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example playbackRepeat({state: 'context'}).then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
       *          otherwise an error. Not returned if a callback is given.
       */
      setRepeat: function (options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/player/repeat')
          .withQueryParameters({
            state: options.state || 'off'
          })
          .build()
          .execute(HttpManager.put, callback);
      },

      /**
       * Set Shuffle Mode On The Current User's Playback
       * @param {Object} [options] Options, being state (true, false).
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example playbackShuffle({state: 'false'}).then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
       *          otherwise an error. Not returned if a callback is given.
       */
      setShuffle: function (options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/player/shuffle')
          .withQueryParameters({
            state: options.state || 'false'
          })
          .build()
          .execute(HttpManager.put, callback);
      },

      /**
       * Set the volume for the user’s current playback device.
       *
       * @param {number} volumePercent The volume to set. Must be a value from 0 to 100 inclusive.
       * @param {Object} options A JSON object with options that can be passed.
       * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
       * one is the error object (null if no error), and the second is the value if the request succeeded.
       * @return {Object} Null if a callback is provided, a `Promise` object otherwise
       */
      setVolume: function (volumePercent, options, callback) {
        var params = {
          /* jshint camelcase: false */
          volume_percent: volumePercent
        };
        if (options && 'device_id' in options) {
          /* jshint camelcase: false */
          params.device_id = options.device_id;
        }
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/player/volume')
          .withQueryParameters(params)
          .build()
          .execute(HttpManager.put, callback);
      },

      /**
       * Add the current user as a follower of one or more other Spotify users.
       * @param {string[]} userIds The IDs of the users to be followed.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example followUsers(['thelinmichael', 'wizzler']).then(...)
       * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
       *          it contains an error object. Not returned if a callback is given.
       */
      followUsers: function (userIds, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/following')
          .withQueryParameters({
            ids: userIds.join(','),
            type: 'user'
          })
          .build()
          .execute(HttpManager.put, callback);
      },

      /**
       * Add the current user as a follower of one or more artists.
       * @param {string[]} artistIds The IDs of the artists to be followed.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example followArtists(['0LcJLqbBmaGUft1e9Mm8HV', '3gqv1kgivAc92KnUm4elKv']).then(...)
       * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
       *          it contains an error object. Not returned if a callback is given.
       */
      followArtists: function (artistIds, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/following')
          .withQueryParameters({
            ids: artistIds.join(','),
            type: 'artist'
          })
          .build()
          .execute(HttpManager.put, callback);
      },

      /**
       * Remove the current user as a follower of one or more other Spotify users.
       * @param {string[]} userIds The IDs of the users to be unfollowed.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example unfollowUsers(['thelinmichael', 'wizzler']).then(...)
       * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
       *          it contains an error object. Not returned if a callback is given.
       */
      unfollowUsers: function (userIds, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/following')
          .withQueryParameters({
            ids: userIds.join(','),
            type: 'user'
          })
          .build()
          .execute(HttpManager.del, callback);
      },

      /**
       * Remove the current user as a follower of one or more artists.
       * @param {string[]} artistIds The IDs of the artists to be unfollowed.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example unfollowArtists(['0LcJLqbBmaGUft1e9Mm8HV', '3gqv1kgivAc92KnUm4elKv']).then(...)
       * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
       *          it contains an error object. Not returned if a callback is given.
       */
      unfollowArtists: function (artistIds, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/following')
          .withQueryParameters({
            ids: artistIds.join(','),
            type: 'artist'
          })
          .build()
          .execute(HttpManager.del, callback);
      },

      /**
       * Check to see if the current user is following one or more other Spotify users.
       * @param {string[]} userIds The IDs of the users to check if are followed by the current user.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example isFollowingUsers(['thelinmichael', 'wizzler']).then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves into an array of booleans. The order
       *          of the returned array's elements correspond to the users IDs in the request.
       *          The boolean value of true indicates that the user is following that user, otherwise is not.
       *          Not returned if a callback is given.
       */
      isFollowingUsers: function (userIds, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/following/contains')
          .withQueryParameters({
            ids: userIds.join(','),
            type: 'user'
          })
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Get the current user's followed artists.
       * @param {Object} [options] Options, being after and limit.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a paging object which contains
       * album objects. Not returned if a callback is given.
       */
      getFollowedArtists: function (options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/following')
          .withHeaders({ 'Content-Type': 'application/json' })
          .withQueryParameters({
              type: 'artist'
            },
            options
          )
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Check if users are following a playlist.
       * @param {string} userId The playlist's owner's user ID
       * @param {string} playlistId The playlist's ID
       * @param {String[]} User IDs of the following users
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful returns an array of booleans. If rejected,
       * it contains an error object. Not returned if a callback is given.
       */
      areFollowingPlaylist: function (userId, playlistId, followerIds, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath(
            '/v1/users/' +
            encodeURIComponent(userId) +
            '/playlists/' +
            playlistId +
            '/followers/contains'
          )
          .withQueryParameters({
            ids: followerIds.join(',')
          })
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Check to see if the current user is following one or more artists.
       * @param {string[]} artistIds The IDs of the artists to check if are followed by the current user.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @example isFollowingArtists(['0LcJLqbBmaGUft1e9Mm8HV', '3gqv1kgivAc92KnUm4elKv']).then(...)
       * @returns {Promise|undefined} A promise that if successful, resolves into an array of booleans. The order
       *          of the returned array's elements correspond to the artists IDs in the request.
       *          The boolean value of true indicates that the user is following that artist, otherwise is not.
       *          Not returned if a callback is given.
       */
      isFollowingArtists: function (artistIds, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/me/following/contains')
          .withQueryParameters({
            ids: artistIds.join(','),
            type: 'artist'
          })
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Retrieve new releases
       * @param {Object} [options] Options, being country, limit and/or offset.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a paging object which contains
       * album objects. Not returned if a callback is given.
       */
      getNewReleases: function (options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/browse/new-releases')
          .withHeaders({ 'Content-Type': 'application/json' })
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Retrieve featured playlists
       * @param {Object} [options] Options, being country, locale, timestamp, limit, offset.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a paging object which contains
       * featured playlists. Not returned if a callback is given.
       */
      getFeaturedPlaylists: function (options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/browse/featured-playlists')
          .withHeaders({ 'Content-Type': 'application/json' })
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Retrieve a list of categories used to tag items in Spotify (e.g. in the 'Browse' tab)
       * @param {Object} [options] Options, being country, locale, limit, offset.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a paging object of categories.
       * Not returned if a callback is given.
       */
      getCategories: function (options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/browse/categories')
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Retrieve a category.
       * @param {string} categoryId The id of the category to retrieve.
       * @param {Object} [options] Options, being country, locale.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a category object.
       * Not returned if a callback is given.
       */
      getCategory: function (categoryId, options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/browse/categories/' + categoryId)
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      },

      /**
       * Retrieve playlists for a category.
       * @param {string} categoryId The id of the category to retrieve playlists for.
       * @param {Object} [options] Options, being country, limit, offset.
       * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
       * @returns {Promise|undefined} A promise that if successful, resolves to a paging object containing simple playlists.
       * Not returned if a callback is given.
       */
      getPlaylistsForCategory: function (categoryId, options, callback) {
        return WebApiRequest.builder(this.getAccessToken())
          .withPath('/v1/browse/categories/' + categoryId + '/playlists')
          .withQueryParameters(options)
          .build()
          .execute(HttpManager.get, callback);
      }
    };

    SpotifyWebApi._addMethods = function (methods) {
      for (var i in methods) {
        if (methods.hasOwnProperty(i)) {
          this.prototype[i] = methods[i];
        }
      }
    };

    module.exports = SpotifyWebApi;

}, { "./authentication-request": 3, "./http-manager": 6, "./webapi-request": 9 }],
  8: [function (require, module, exports) {
    'use strict';

    function WebapiError(message, statusCode) {
      this.name = 'WebapiError';
      this.message = message || '';
      this.statusCode = statusCode;
    }

    WebapiError.prototype = Error.prototype;

    module.exports = WebapiError;

}, {}],
  9: [function (require, module, exports) {
    'use strict';

    var Request = require('./base-request');

    var DEFAULT_HOST = 'api.spotify.com',
      DEFAULT_PORT = 443,
      DEFAULT_SCHEME = 'https';

    module.exports.builder = function (accessToken) {
      return Request.builder()
        .withHost(DEFAULT_HOST)
        .withPort(DEFAULT_PORT)
        .withScheme(DEFAULT_SCHEME)
        .withAuth(accessToken);
    };

}, { "./base-request": 4 }],
  10: [function (require, module, exports) {
    function Agent() {
      this._defaults = [];
    }

["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects",
 "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert"].forEach(function (fn) {
      /** Default setting for all requests from this agent */
      Agent.prototype[fn] = function ( /*varargs*/ ) {
        this._defaults.push({ fn: fn, arguments: arguments });
        return this;
      }
    });

    Agent.prototype._setDefaults = function (req) {
      this._defaults.forEach(function (def) {
        req[def.fn].apply(req, def.arguments);
      });
    };

    module.exports = Agent;

}, {}],
  11: [function (require, module, exports) {
    /**
     * Root reference for iframes.
     */

    var root;
    if (typeof window !== 'undefined') { // Browser window
      root = window;
    }
    else if (typeof self !== 'undefined') { // Web Worker
      root = self;
    }
    else { // Other environments
      console.warn("Using browser-only version of superagent in non-browser environment");
      root = this;
    }

    var Emitter = require('component-emitter');
    var RequestBase = require('./request-base');
    var isObject = require('./is-object');
    var ResponseBase = require('./response-base');
    var Agent = require('./agent-base');

    /**
     * Noop.
     */

    function noop() {};

    /**
     * Expose `request`.
     */

    var request = exports = module.exports = function (method, url) {
      // callback
      if ('function' == typeof url) {
        return new exports.Request('GET', method).end(url);
      }

      // url first
      if (1 == arguments.length) {
        return new exports.Request('GET', method);
      }

      return new exports.Request(method, url);
    }

    exports.Request = Request;

    /**
     * Determine XHR.
     */

    request.getXHR = function () {
      if (root.XMLHttpRequest &&
        (!root.location || 'file:' != root.location.protocol ||
          !root.ActiveXObject)) {
        return new XMLHttpRequest;
      }
      else {
        try { return new ActiveXObject('Microsoft.XMLHTTP'); }
        catch (e) {}
        try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); }
        catch (e) {}
        try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); }
        catch (e) {}
        try { return new ActiveXObject('Msxml2.XMLHTTP'); }
        catch (e) {}
      }
      throw Error("Browser-only version of superagent could not find XHR");
    };

    /**
     * Removes leading and trailing whitespace, added to support IE.
     *
     * @param {String} s
     * @return {String}
     * @api private
     */

    var trim = ''.trim ?
      function (s) { return s.trim(); } :
      function (s) { return s.replace(/(^\s*|\s*$)/g, ''); };

    /**
     * Serialize the given `obj`.
     *
     * @param {Object} obj
     * @return {String}
     * @api private
     */

    function serialize(obj) {
      if (!isObject(obj)) return obj;
      var pairs = [];
      for (var key in obj) {
        pushEncodedKeyValuePair(pairs, key, obj[key]);
      }
      return pairs.join('&');
    }

    /**
     * Helps 'serialize' with serializing arrays.
     * Mutates the pairs array.
     *
     * @param {Array} pairs
     * @param {String} key
     * @param {Mixed} val
     */

    function pushEncodedKeyValuePair(pairs, key, val) {
      if (val != null) {
        if (Array.isArray(val)) {
          val.forEach(function (v) {
            pushEncodedKeyValuePair(pairs, key, v);
          });
        }
        else if (isObject(val)) {
          for (var subkey in val) {
            pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
          }
        }
        else {
          pairs.push(encodeURIComponent(key) +
            '=' + encodeURIComponent(val));
        }
      }
      else if (val === null) {
        pairs.push(encodeURIComponent(key));
      }
    }

    /**
     * Expose serialization method.
     */

    request.serializeObject = serialize;

    /**
     * Parse the given x-www-form-urlencoded `str`.
     *
     * @param {String} str
     * @return {Object}
     * @api private
     */

    function parseString(str) {
      var obj = {};
      var pairs = str.split('&');
      var pair;
      var pos;

      for (var i = 0, len = pairs.length; i < len; ++i) {
        pair = pairs[i];
        pos = pair.indexOf('=');
        if (pos == -1) {
          obj[decodeURIComponent(pair)] = '';
        }
        else {
          obj[decodeURIComponent(pair.slice(0, pos))] =
            decodeURIComponent(pair.slice(pos + 1));
        }
      }

      return obj;
    }

    /**
     * Expose parser.
     */

    request.parseString = parseString;

    /**
     * Default MIME type map.
     *
     *     superagent.types.xml = 'application/xml';
     *
     */

    request.types = {
      html: 'text/html',
      json: 'application/json',
      xml: 'text/xml',
      urlencoded: 'application/x-www-form-urlencoded',
      'form': 'application/x-www-form-urlencoded',
      'form-data': 'application/x-www-form-urlencoded'
    };

    /**
     * Default serialization map.
     *
     *     superagent.serialize['application/xml'] = function(obj){
     *       return 'generated xml here';
     *     };
     *
     */

    request.serialize = {
      'application/x-www-form-urlencoded': serialize,
      'application/json': JSON.stringify
    };

    /**
     * Default parsers.
     *
     *     superagent.parse['application/xml'] = function(str){
     *       return { object parsed from str };
     *     };
     *
     */

    request.parse = {
      'application/x-www-form-urlencoded': parseString,
      'application/json': JSON.parse
    };

    /**
     * Parse the given header `str` into
     * an object containing the mapped fields.
     *
     * @param {String} str
     * @return {Object}
     * @api private
     */

    function parseHeader(str) {
      var lines = str.split(/\r?\n/);
      var fields = {};
      var index;
      var line;
      var field;
      var val;

      for (var i = 0, len = lines.length; i < len; ++i) {
        line = lines[i];
        index = line.indexOf(':');
        if (index === -1) { // could be empty line, just skip it
          continue;
        }
        field = line.slice(0, index).toLowerCase();
        val = trim(line.slice(index + 1));
        fields[field] = val;
      }

      return fields;
    }

    /**
     * Check if `mime` is json or has +json structured syntax suffix.
     *
     * @param {String} mime
     * @return {Boolean}
     * @api private
     */

    function isJSON(mime) {
      // should match /json or +json
      // but not /json-seq
      return /[\/+]json($|[^-\w])/.test(mime);
    }

    /**
     * Initialize a new `Response` with the given `xhr`.
     *
     *  - set flags (.ok, .error, etc)
     *  - parse header
     *
     * Examples:
     *
     *  Aliasing `superagent` as `request` is nice:
     *
     *      request = superagent;
     *
     *  We can use the promise-like API, or pass callbacks:
     *
     *      request.get('/').end(function(res){});
     *      request.get('/', function(res){});
     *
     *  Sending data can be chained:
     *
     *      request
     *        .post('/user')
     *        .send({ name: 'tj' })
     *        .end(function(res){});
     *
     *  Or passed to `.send()`:
     *
     *      request
     *        .post('/user')
     *        .send({ name: 'tj' }, function(res){});
     *
     *  Or passed to `.post()`:
     *
     *      request
     *        .post('/user', { name: 'tj' })
     *        .end(function(res){});
     *
     * Or further reduced to a single call for simple cases:
     *
     *      request
     *        .post('/user', { name: 'tj' }, function(res){});
     *
     * @param {XMLHTTPRequest} xhr
     * @param {Object} options
     * @api private
     */

    function Response(req) {
      this.req = req;
      this.xhr = this.req.xhr;
      // responseText is accessible only if responseType is '' or 'text' and on older browsers
      this.text = ((this.req.method != 'HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined') ?
        this.xhr.responseText :
        null;
      this.statusText = this.req.xhr.statusText;
      var status = this.xhr.status;
      // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
      if (status === 1223) {
        status = 204;
      }
      this._setStatusProperties(status);
      this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
      // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
      // getResponseHeader still works. so we get content-type even if getting
      // other headers fails.
      this.header['content-type'] = this.xhr.getResponseHeader('content-type');
      this._setHeaderProperties(this.header);

      if (null === this.text && req._responseType) {
        this.body = this.xhr.response;
      }
      else {
        this.body = this.req.method != 'HEAD' ?
          this._parseBody(this.text ? this.text : this.xhr.response) :
          null;
      }
    }

    ResponseBase(Response.prototype);

    /**
     * Parse the given body `str`.
     *
     * Used for auto-parsing of bodies. Parsers
     * are defined on the `superagent.parse` object.
     *
     * @param {String} str
     * @return {Mixed}
     * @api private
     */

    Response.prototype._parseBody = function (str) {
      var parse = request.parse[this.type];
      if (this.req._parser) {
        return this.req._parser(this, str);
      }
      if (!parse && isJSON(this.type)) {
        parse = request.parse['application/json'];
      }
      return parse && str && (str.length || str instanceof Object) ?
        parse(str) :
        null;
    };

    /**
     * Return an `Error` representative of this response.
     *
     * @return {Error}
     * @api public
     */

    Response.prototype.toError = function () {
      var req = this.req;
      var method = req.method;
      var url = req.url;

      var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
      var err = new Error(msg);
      err.status = this.status;
      err.method = method;
      err.url = url;

      return err;
    };

    /**
     * Expose `Response`.
     */

    request.Response = Response;

    /**
     * Initialize a new `Request` with the given `method` and `url`.
     *
     * @param {String} method
     * @param {String} url
     * @api public
     */

    function Request(method, url) {
      var self = this;
      this._query = this._query || [];
      this.method = method;
      this.url = url;
      this.header = {}; // preserves header name case
      this._header = {}; // coerces header names to lowercase
      this.on('end', function () {
        var err = null;
        var res = null;

        try {
          res = new Response(self);
        }
        catch (e) {
          err = new Error('Parser is unable to parse the response');
          err.parse = true;
          err.original = e;
          // issue #675: return the raw response if the response parsing fails
          if (self.xhr) {
            // ie9 doesn't have 'response' property
            err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
            // issue #876: return the http status code if the response parsing fails
            err.status = self.xhr.status ? self.xhr.status : null;
            err.statusCode = err.status; // backwards-compat only
          }
          else {
            err.rawResponse = null;
            err.status = null;
          }

          return self.callback(err);
        }

        self.emit('response', res);

        var new_err;
        try {
          if (!self._isResponseOK(res)) {
            new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
          }
        }
        catch (custom_err) {
          new_err = custom_err; // ok() callback can throw
        }

        // #1000 don't catch errors from the callback to avoid double calling it
        if (new_err) {
          new_err.original = err;
          new_err.response = res;
          new_err.status = res.status;
          self.callback(new_err, res);
        }
        else {
          self.callback(null, res);
        }
      });
    }

    /**
     * Mixin `Emitter` and `RequestBase`.
     */

    Emitter(Request.prototype);
    RequestBase(Request.prototype);

    /**
     * Set Content-Type to `type`, mapping values from `request.types`.
     *
     * Examples:
     *
     *      superagent.types.xml = 'application/xml';
     *
     *      request.post('/')
     *        .type('xml')
     *        .send(xmlstring)
     *        .end(callback);
     *
     *      request.post('/')
     *        .type('application/xml')
     *        .send(xmlstring)
     *        .end(callback);
     *
     * @param {String} type
     * @return {Request} for chaining
     * @api public
     */

    Request.prototype.type = function (type) {
      this.set('Content-Type', request.types[type] || type);
      return this;
    };

    /**
     * Set Accept to `type`, mapping values from `request.types`.
     *
     * Examples:
     *
     *      superagent.types.json = 'application/json';
     *
     *      request.get('/agent')
     *        .accept('json')
     *        .end(callback);
     *
     *      request.get('/agent')
     *        .accept('application/json')
     *        .end(callback);
     *
     * @param {String} accept
     * @return {Request} for chaining
     * @api public
     */

    Request.prototype.accept = function (type) {
      this.set('Accept', request.types[type] || type);
      return this;
    };

    /**
     * Set Authorization field value with `user` and `pass`.
     *
     * @param {String} user
     * @param {String} [pass] optional in case of using 'bearer' as type
     * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
     * @return {Request} for chaining
     * @api public
     */

    Request.prototype.auth = function (user, pass, options) {
      if (1 === arguments.length) pass = '';
      if (typeof pass === 'object' && pass !== null) { // pass is optional and can be replaced with options
        options = pass;
        pass = '';
      }
      if (!options) {
        options = {
          type: 'function' === typeof btoa ? 'basic' : 'auto',
        };
      }

      var encoder = function (string) {
        if ('function' === typeof btoa) {
          return btoa(string);
        }
        throw new Error('Cannot use basic auth, btoa is not a function');
      };

      return this._auth(user, pass, options, encoder);
    };

    /**
     * Add query-string `val`.
     *
     * Examples:
     *
     *   request.get('/shoes')
     *     .query('size=10')
     *     .query({ color: 'blue' })
     *
     * @param {Object|String} val
     * @return {Request} for chaining
     * @api public
     */

    Request.prototype.query = function (val) {
      if ('string' != typeof val) val = serialize(val);
      if (val) this._query.push(val);
      return this;
    };

    /**
     * Queue the given `file` as an attachment to the specified `field`,
     * with optional `options` (or filename).
     *
     * ``` js
     * request.post('/upload')
     *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
     *   .end(callback);
     * ```
     *
     * @param {String} field
     * @param {Blob|File} file
     * @param {String|Object} options
     * @return {Request} for chaining
     * @api public
     */

    Request.prototype.attach = function (field, file, options) {
      if (file) {
        if (this._data) {
          throw Error("superagent can't mix .send() and .attach()");
        }

        this._getFormData().append(field, file, options || file.name);
      }
      return this;
    };

    Request.prototype._getFormData = function () {
      if (!this._formData) {
        this._formData = new root.FormData();
      }
      return this._formData;
    };

    /**
     * Invoke the callback with `err` and `res`
     * and handle arity check.
     *
     * @param {Error} err
     * @param {Response} res
     * @api private
     */

    Request.prototype.callback = function (err, res) {
      if (this._shouldRetry(err, res)) {
        return this._retry();
      }

      var fn = this._callback;
      this.clearTimeout();

      if (err) {
        if (this._maxRetries) err.retries = this._retries - 1;
        this.emit('error', err);
      }

      fn(err, res);
    };

    /**
     * Invoke callback with x-domain error.
     *
     * @api private
     */

    Request.prototype.crossDomainError = function () {
      var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
      err.crossDomain = true;

      err.status = this.status;
      err.method = this.method;
      err.url = this.url;

      this.callback(err);
    };

    // This only warns, because the request is still likely to work
    Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function () {
      console.warn("This is not supported in browser version of superagent");
      return this;
    };

    // This throws, because it can't send/receive data as expected
    Request.prototype.pipe = Request.prototype.write = function () {
      throw Error("Streaming is not supported in browser version of superagent");
    };

    /**
     * Check if `obj` is a host object,
     * we don't want to serialize these :)
     *
     * @param {Object} obj
     * @return {Boolean}
     * @api private
     */
    Request.prototype._isHost = function _isHost(obj) {
      // Native objects stringify to [object File], [object Blob], [object FormData], etc.
      return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
    }

    /**
     * Initiate request, invoking callback `fn(res)`
     * with an instanceof `Response`.
     *
     * @param {Function} fn
     * @return {Request} for chaining
     * @api public
     */

    Request.prototype.end = function (fn) {
      if (this._endCalled) {
        console.warn("Warning: .end() was called twice. This is not supported in superagent");
      }
      this._endCalled = true;

      // store callback
      this._callback = fn || noop;

      // querystring
      this._finalizeQueryString();

      return this._end();
    };

    Request.prototype._end = function () {
      var self = this;
      var xhr = (this.xhr = request.getXHR());
      var data = this._formData || this._data;

      this._setTimeouts();

      // state change
      xhr.onreadystatechange = function () {
        var readyState = xhr.readyState;
        if (readyState >= 2 && self._responseTimeoutTimer) {
          clearTimeout(self._responseTimeoutTimer);
        }
        if (4 != readyState) {
          return;
        }

        // In IE9, reads to any property (e.g. status) off of an aborted XHR will
        // result in the error "Could not complete the operation due to error c00c023f"
        var status;
        try { status = xhr.status }
        catch (e) { status = 0; }

        if (!status) {
          if (self.timedout || self._aborted) return;
          return self.crossDomainError();
        }
        self.emit('end');
      };

      // progress
      var handleProgress = function (direction, e) {
        if (e.total > 0) {
          e.percent = e.loaded / e.total * 100;
        }
        e.direction = direction;
        self.emit('progress', e);
      };
      if (this.hasListeners('progress')) {
        try {
          xhr.onprogress = handleProgress.bind(null, 'download');
          if (xhr.upload) {
            xhr.upload.onprogress = handleProgress.bind(null, 'upload');
          }
        }
        catch (e) {
          // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
          // Reported here:
          // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
        }
      }

      // initiate request
      try {
        if (this.username && this.password) {
          xhr.open(this.method, this.url, true, this.username, this.password);
        }
        else {
          xhr.open(this.method, this.url, true);
        }
      }
      catch (err) {
        // see #1149
        return this.callback(err);
      }

      // CORS
      if (this._withCredentials) xhr.withCredentials = true;

      // body
      if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
        // serialize stuff
        var contentType = this._header['content-type'];
        var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
        if (!serialize && isJSON(contentType)) {
          serialize = request.serialize['application/json'];
        }
        if (serialize) data = serialize(data);
      }

      // set header fields
      for (var field in this.header) {
        if (null == this.header[field]) continue;

        if (this.header.hasOwnProperty(field))
          xhr.setRequestHeader(field, this.header[field]);
      }

      if (this._responseType) {
        xhr.responseType = this._responseType;
      }

      // send stuff
      this.emit('request', this);

      // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
      // We need null here if data is undefined
      xhr.send(typeof data !== 'undefined' ? data : null);
      return this;
    };

    request.agent = function () {
      return new Agent();
    };

["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"].forEach(function (method) {
      Agent.prototype[method.toLowerCase()] = function (url, fn) {
        var req = new request.Request(method, url);
        this._setDefaults(req);
        if (fn) {
          req.end(fn);
        }
        return req;
      };
    });

    Agent.prototype.del = Agent.prototype['delete'];

    /**
     * GET `url` with optional callback `fn(res)`.
     *
     * @param {String} url
     * @param {Mixed|Function} [data] or fn
     * @param {Function} [fn]
     * @return {Request}
     * @api public
     */

    request.get = function (url, data, fn) {
      var req = request('GET', url);
      if ('function' == typeof data)(fn = data), (data = null);
      if (data) req.query(data);
      if (fn) req.end(fn);
      return req;
    };

    /**
     * HEAD `url` with optional callback `fn(res)`.
     *
     * @param {String} url
     * @param {Mixed|Function} [data] or fn
     * @param {Function} [fn]
     * @return {Request}
     * @api public
     */

    request.head = function (url, data, fn) {
      var req = request('HEAD', url);
      if ('function' == typeof data)(fn = data), (data = null);
      if (data) req.query(data);
      if (fn) req.end(fn);
      return req;
    };

    /**
     * OPTIONS query to `url` with optional callback `fn(res)`.
     *
     * @param {String} url
     * @param {Mixed|Function} [data] or fn
     * @param {Function} [fn]
     * @return {Request}
     * @api public
     */

    request.options = function (url, data, fn) {
      var req = request('OPTIONS', url);
      if ('function' == typeof data)(fn = data), (data = null);
      if (data) req.send(data);
      if (fn) req.end(fn);
      return req;
    };

    /**
     * DELETE `url` with optional `data` and callback `fn(res)`.
     *
     * @param {String} url
     * @param {Mixed} [data]
     * @param {Function} [fn]
     * @return {Request}
     * @api public
     */

    function del(url, data, fn) {
      var req = request('DELETE', url);
      if ('function' == typeof data)(fn = data), (data = null);
      if (data) req.send(data);
      if (fn) req.end(fn);
      return req;
    }

    request['del'] = del;
    request['delete'] = del;

    /**
     * PATCH `url` with optional `data` and callback `fn(res)`.
     *
     * @param {String} url
     * @param {Mixed} [data]
     * @param {Function} [fn]
     * @return {Request}
     * @api public
     */

    request.patch = function (url, data, fn) {
      var req = request('PATCH', url);
      if ('function' == typeof data)(fn = data), (data = null);
      if (data) req.send(data);
      if (fn) req.end(fn);
      return req;
    };

    /**
     * POST `url` with optional `data` and callback `fn(res)`.
     *
     * @param {String} url
     * @param {Mixed} [data]
     * @param {Function} [fn]
     * @return {Request}
     * @api public
     */

    request.post = function (url, data, fn) {
      var req = request('POST', url);
      if ('function' == typeof data)(fn = data), (data = null);
      if (data) req.send(data);
      if (fn) req.end(fn);
      return req;
    };

    /**
     * PUT `url` with optional `data` and callback `fn(res)`.
     *
     * @param {String} url
     * @param {Mixed|Function} [data] or fn
     * @param {Function} [fn]
     * @return {Request}
     * @api public
     */

    request.put = function (url, data, fn) {
      var req = request('PUT', url);
      if ('function' == typeof data)(fn = data), (data = null);
      if (data) req.send(data);
      if (fn) req.end(fn);
      return req;
    };

}, { "./agent-base": 10, "./is-object": 12, "./request-base": 13, "./response-base": 14, "component-emitter": 2 }],
  12: [function (require, module, exports) {
    'use strict';

    /**
     * Check if `obj` is an object.
     *
     * @param {Object} obj
     * @return {Boolean}
     * @api private
     */

    function isObject(obj) {
      return null !== obj && 'object' === typeof obj;
    }

    module.exports = isObject;

}, {}],
  13: [function (require, module, exports) {
    'use strict';

    /**
     * Module of mixed-in functions shared between node and client code
     */
    var isObject = require('./is-object');

    /**
     * Expose `RequestBase`.
     */

    module.exports = RequestBase;

    /**
     * Initialize a new `RequestBase`.
     *
     * @api public
     */

    function RequestBase(obj) {
      if (obj) return mixin(obj);
    }

    /**
     * Mixin the prototype properties.
     *
     * @param {Object} obj
     * @return {Object}
     * @api private
     */

    function mixin(obj) {
      for (var key in RequestBase.prototype) {
        obj[key] = RequestBase.prototype[key];
      }
      return obj;
    }

    /**
     * Clear previous timeout.
     *
     * @return {Request} for chaining
     * @api public
     */

    RequestBase.prototype.clearTimeout = function _clearTimeout() {
      clearTimeout(this._timer);
      clearTimeout(this._responseTimeoutTimer);
      delete this._timer;
      delete this._responseTimeoutTimer;
      return this;
    };

    /**
     * Override default response body parser
     *
     * This function will be called to convert incoming data into request.body
     *
     * @param {Function}
     * @api public
     */

    RequestBase.prototype.parse = function parse(fn) {
      this._parser = fn;
      return this;
    };

    /**
     * Set format of binary response body.
     * In browser valid formats are 'blob' and 'arraybuffer',
     * which return Blob and ArrayBuffer, respectively.
     *
     * In Node all values result in Buffer.
     *
     * Examples:
     *
     *      req.get('/')
     *        .responseType('blob')
     *        .end(callback);
     *
     * @param {String} val
     * @return {Request} for chaining
     * @api public
     */

    RequestBase.prototype.responseType = function (val) {
      this._responseType = val;
      return this;
    };

    /**
     * Override default request body serializer
     *
     * This function will be called to convert data set via .send or .attach into payload to send
     *
     * @param {Function}
     * @api public
     */

    RequestBase.prototype.serialize = function serialize(fn) {
      this._serializer = fn;
      return this;
    };

    /**
     * Set timeouts.
     *
     * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
     * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
     *
     * Value of 0 or false means no timeout.
     *
     * @param {Number|Object} ms or {response, deadline}
     * @return {Request} for chaining
     * @api public
     */

    RequestBase.prototype.timeout = function timeout(options) {
      if (!options || 'object' !== typeof options) {
        this._timeout = options;
        this._responseTimeout = 0;
        return this;
      }

      for (var option in options) {
        switch (option) {
        case 'deadline':
          this._timeout = options.deadline;
          break;
        case 'response':
          this._responseTimeout = options.response;
          break;
        default:
          console.warn("Unknown timeout option", option);
        }
      }
      return this;
    };

    /**
     * Set number of retry attempts on error.
     *
     * Failed requests will be retried 'count' times if timeout or err.code >= 500.
     *
     * @param {Number} count
     * @param {Function} [fn]
     * @return {Request} for chaining
     * @api public
     */

    RequestBase.prototype.retry = function retry(count, fn) {
      // Default to 1 if no count passed or true
      if (arguments.length === 0 || count === true) count = 1;
      if (count <= 0) count = 0;
      this._maxRetries = count;
      this._retries = 0;
      this._retryCallback = fn;
      return this;
    };

    var ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];

    /**
     * Determine if a request should be retried.
     * (Borrowed from segmentio/superagent-retry)
     *
     * @param {Error} err
     * @param {Response} [res]
     * @returns {Boolean}
     */
    RequestBase.prototype._shouldRetry = function (err, res) {
      if (!this._maxRetries || this._retries++ >= this._maxRetries) {
        return false;
      }
      if (this._retryCallback) {
        try {
          var override = this._retryCallback(err, res);
          if (override === true) return true;
          if (override === false) return false;
          // undefined falls back to defaults
        }
        catch (e) {
          console.error(e);
        }
      }
      if (res && res.status && res.status >= 500 && res.status != 501) return true;
      if (err) {
        if (err.code && ~ERROR_CODES.indexOf(err.code)) return true;
        // Superagent timeout
        if (err.timeout && err.code == 'ECONNABORTED') return true;
        if (err.crossDomain) return true;
      }
      return false;
    };

    /**
     * Retry request
     *
     * @return {Request} for chaining
     * @api private
     */

    RequestBase.prototype._retry = function () {

      this.clearTimeout();

      // node
      if (this.req) {
        this.req = null;
        this.req = this.request();
      }

      this._aborted = false;
      this.timedout = false;

      return this._end();
    };

    /**
     * Promise support
     *
     * @param {Function} resolve
     * @param {Function} [reject]
     * @return {Request}
     */

    RequestBase.prototype.then = function then(resolve, reject) {
      if (!this._fullfilledPromise) {
        var self = this;
        if (this._endCalled) {
          console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
        }
        this._fullfilledPromise = new Promise(function (innerResolve, innerReject) {
          self.end(function (err, res) {
            if (err) innerReject(err);
            else innerResolve(res);
          });
        });
      }
      return this._fullfilledPromise.then(resolve, reject);
    };

    RequestBase.prototype['catch'] = function (cb) {
      return this.then(undefined, cb);
    };

    /**
     * Allow for extension
     */

    RequestBase.prototype.use = function use(fn) {
      fn(this);
      return this;
    };

    RequestBase.prototype.ok = function (cb) {
      if ('function' !== typeof cb) throw Error("Callback required");
      this._okCallback = cb;
      return this;
    };

    RequestBase.prototype._isResponseOK = function (res) {
      if (!res) {
        return false;
      }

      if (this._okCallback) {
        return this._okCallback(res);
      }

      return res.status >= 200 && res.status < 300;
    };

    /**
     * Get request header `field`.
     * Case-insensitive.
     *
     * @param {String} field
     * @return {String}
     * @api public
     */

    RequestBase.prototype.get = function (field) {
      return this._header[field.toLowerCase()];
    };

    /**
     * Get case-insensitive header `field` value.
     * This is a deprecated internal API. Use `.get(field)` instead.
     *
     * (getHeader is no longer used internally by the superagent code base)
     *
     * @param {String} field
     * @return {String}
     * @api private
     * @deprecated
     */

    RequestBase.prototype.getHeader = RequestBase.prototype.get;

    /**
     * Set header `field` to `val`, or multiple fields with one object.
     * Case-insensitive.
     *
     * Examples:
     *
     *      req.get('/')
     *        .set('Accept', 'application/json')
     *        .set('X-API-Key', 'foobar')
     *        .end(callback);
     *
     *      req.get('/')
     *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
     *        .end(callback);
     *
     * @param {String|Object} field
     * @param {String} val
     * @return {Request} for chaining
     * @api public
     */

    RequestBase.prototype.set = function (field, val) {
      if (isObject(field)) {
        for (var key in field) {
          this.set(key, field[key]);
        }
        return this;
      }
      this._header[field.toLowerCase()] = val;
      this.header[field] = val;
      return this;
    };

    /**
     * Remove header `field`.
     * Case-insensitive.
     *
     * Example:
     *
     *      req.get('/')
     *        .unset('User-Agent')
     *        .end(callback);
     *
     * @param {String} field
     */
    RequestBase.prototype.unset = function (field) {
      delete this._header[field.toLowerCase()];
      delete this.header[field];
      return this;
    };

    /**
     * Write the field `name` and `val`, or multiple fields with one object
     * for "multipart/form-data" request bodies.
     *
     * ``` js
     * request.post('/upload')
     *   .field('foo', 'bar')
     *   .end(callback);
     *
     * request.post('/upload')
     *   .field({ foo: 'bar', baz: 'qux' })
     *   .end(callback);
     * ```
     *
     * @param {String|Object} name
     * @param {String|Blob|File|Buffer|fs.ReadStream} val
     * @return {Request} for chaining
     * @api public
     */
    RequestBase.prototype.field = function (name, val) {
      // name should be either a string or an object.
      if (null === name || undefined === name) {
        throw new Error('.field(name, val) name can not be empty');
      }

      if (this._data) {
        console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
      }

      if (isObject(name)) {
        for (var key in name) {
          this.field(key, name[key]);
        }
        return this;
      }

      if (Array.isArray(val)) {
        for (var i in val) {
          this.field(name, val[i]);
        }
        return this;
      }

      // val should be defined now
      if (null === val || undefined === val) {
        throw new Error('.field(name, val) val can not be empty');
      }
      if ('boolean' === typeof val) {
        val = '' + val;
      }
      this._getFormData().append(name, val);
      return this;
    };

    /**
     * Abort the request, and clear potential timeout.
     *
     * @return {Request}
     * @api public
     */
    RequestBase.prototype.abort = function () {
      if (this._aborted) {
        return this;
      }
      this._aborted = true;
      this.xhr && this.xhr.abort(); // browser
      this.req && this.req.abort(); // node
      this.clearTimeout();
      this.emit('abort');
      return this;
    };

    RequestBase.prototype._auth = function (user, pass, options, base64Encoder) {
      switch (options.type) {
      case 'basic':
        this.set('Authorization', 'Basic ' + base64Encoder(user + ':' + pass));
        break;

      case 'auto':
        this.username = user;
        this.password = pass;
        break;

      case 'bearer': // usage would be .auth(accessToken, { type: 'bearer' })
        this.set('Authorization', 'Bearer ' + user);
        break;
      }
      return this;
    };

    /**
     * Enable transmission of cookies with x-domain requests.
     *
     * Note that for this to work the origin must not be
     * using "Access-Control-Allow-Origin" with a wildcard,
     * and also must set "Access-Control-Allow-Credentials"
     * to "true".
     *
     * @api public
     */

    RequestBase.prototype.withCredentials = function (on) {
      // This is browser-only functionality. Node side is no-op.
      if (on == undefined) on = true;
      this._withCredentials = on;
      return this;
    };

    /**
     * Set the max redirects to `n`. Does noting in browser XHR implementation.
     *
     * @param {Number} n
     * @return {Request} for chaining
     * @api public
     */

    RequestBase.prototype.redirects = function (n) {
      this._maxRedirects = n;
      return this;
    };

    /**
     * Maximum size of buffered response body, in bytes. Counts uncompressed size.
     * Default 200MB.
     *
     * @param {Number} n
     * @return {Request} for chaining
     */
    RequestBase.prototype.maxResponseSize = function (n) {
      if ('number' !== typeof n) {
        throw TypeError("Invalid argument");
      }
      this._maxResponseSize = n;
      return this;
    };

    /**
     * Convert to a plain javascript object (not JSON string) of scalar properties.
     * Note as this method is designed to return a useful non-this value,
     * it cannot be chained.
     *
     * @return {Object} describing method, url, and data of this request
     * @api public
     */

    RequestBase.prototype.toJSON = function () {
      return {
        method: this.method,
        url: this.url,
        data: this._data,
        headers: this._header,
      };
    };

    /**
     * Send `data` as the request body, defaulting the `.type()` to "json" when
     * an object is given.
     *
     * Examples:
     *
     *       // manual json
     *       request.post('/user')
     *         .type('json')
     *         .send('{"name":"tj"}')
     *         .end(callback)
     *
     *       // auto json
     *       request.post('/user')
     *         .send({ name: 'tj' })
     *         .end(callback)
     *
     *       // manual x-www-form-urlencoded
     *       request.post('/user')
     *         .type('form')
     *         .send('name=tj')
     *         .end(callback)
     *
     *       // auto x-www-form-urlencoded
     *       request.post('/user')
     *         .type('form')
     *         .send({ name: 'tj' })
     *         .end(callback)
     *
     *       // defaults to x-www-form-urlencoded
     *      request.post('/user')
     *        .send('name=tobi')
     *        .send('species=ferret')
     *        .end(callback)
     *
     * @param {String|Object} data
     * @return {Request} for chaining
     * @api public
     */

    RequestBase.prototype.send = function (data) {
      var isObj = isObject(data);
      var type = this._header['content-type'];

      if (this._formData) {
        console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
      }

      if (isObj && !this._data) {
        if (Array.isArray(data)) {
          this._data = [];
        }
        else if (!this._isHost(data)) {
          this._data = {};
        }
      }
      else if (data && this._data && this._isHost(this._data)) {
        throw Error("Can't merge these send calls");
      }

      // merge
      if (isObj && isObject(this._data)) {
        for (var key in data) {
          this._data[key] = data[key];
        }
      }
      else if ('string' == typeof data) {
        // default to x-www-form-urlencoded
        if (!type) this.type('form');
        type = this._header['content-type'];
        if ('application/x-www-form-urlencoded' == type) {
          this._data = this._data ?
            this._data + '&' + data :
            data;
        }
        else {
          this._data = (this._data || '') + data;
        }
      }
      else {
        this._data = data;
      }

      if (!isObj || this._isHost(data)) {
        return this;
      }

      // default to json
      if (!type) this.type('json');
      return this;
    };

    /**
     * Sort `querystring` by the sort function
     *
     *
     * Examples:
     *
     *       // default order
     *       request.get('/user')
     *         .query('name=Nick')
     *         .query('search=Manny')
     *         .sortQuery()
     *         .end(callback)
     *
     *       // customized sort function
     *       request.get('/user')
     *         .query('name=Nick')
     *         .query('search=Manny')
     *         .sortQuery(function(a, b){
     *           return a.length - b.length;
     *         })
     *         .end(callback)
     *
     *
     * @param {Function} sort
     * @return {Request} for chaining
     * @api public
     */

    RequestBase.prototype.sortQuery = function (sort) {
      // _sort default to true but otherwise can be a function or boolean
      this._sort = typeof sort === 'undefined' ? true : sort;
      return this;
    };

    /**
     * Compose querystring to append to req.url
     *
     * @api private
     */
    RequestBase.prototype._finalizeQueryString = function () {
      var query = this._query.join('&');
      if (query) {
        this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
      }
      this._query.length = 0; // Makes the call idempotent

      if (this._sort) {
        var index = this.url.indexOf('?');
        if (index >= 0) {
          var queryArr = this.url.substring(index + 1).split('&');
          if ('function' === typeof this._sort) {
            queryArr.sort(this._sort);
          }
          else {
            queryArr.sort();
          }
          this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
        }
      }
    };

    // For backwards compat only
    RequestBase.prototype._appendQueryString = function () { console.trace("Unsupported"); }

    /**
     * Invoke callback with timeout error.
     *
     * @api private
     */

    RequestBase.prototype._timeoutError = function (reason, timeout, errno) {
      if (this._aborted) {
        return;
      }
      var err = new Error(reason + timeout + 'ms exceeded');
      err.timeout = timeout;
      err.code = 'ECONNABORTED';
      err.errno = errno;
      this.timedout = true;
      this.abort();
      this.callback(err);
    };

    RequestBase.prototype._setTimeouts = function () {
      var self = this;

      // deadline
      if (this._timeout && !this._timer) {
        this._timer = setTimeout(function () {
          self._timeoutError('Timeout of ', self._timeout, 'ETIME');
        }, this._timeout);
      }
      // response timeout
      if (this._responseTimeout && !this._responseTimeoutTimer) {
        this._responseTimeoutTimer = setTimeout(function () {
          self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
        }, this._responseTimeout);
      }
    };

}, { "./is-object": 12 }],
  14: [function (require, module, exports) {
    'use strict';

    /**
     * Module dependencies.
     */

    var utils = require('./utils');

    /**
     * Expose `ResponseBase`.
     */

    module.exports = ResponseBase;

    /**
     * Initialize a new `ResponseBase`.
     *
     * @api public
     */

    function ResponseBase(obj) {
      if (obj) return mixin(obj);
    }

    /**
     * Mixin the prototype properties.
     *
     * @param {Object} obj
     * @return {Object}
     * @api private
     */

    function mixin(obj) {
      for (var key in ResponseBase.prototype) {
        obj[key] = ResponseBase.prototype[key];
      }
      return obj;
    }

    /**
     * Get case-insensitive `field` value.
     *
     * @param {String} field
     * @return {String}
     * @api public
     */

    ResponseBase.prototype.get = function (field) {
      return this.header[field.toLowerCase()];
    };

    /**
     * Set header related properties:
     *
     *   - `.type` the content type without params
     *
     * A response of "Content-Type: text/plain; charset=utf-8"
     * will provide you with a `.type` of "text/plain".
     *
     * @param {Object} header
     * @api private
     */

    ResponseBase.prototype._setHeaderProperties = function (header) {
      // TODO: moar!
      // TODO: make this a util

      // content-type
      var ct = header['content-type'] || '';
      this.type = utils.type(ct);

      // params
      var params = utils.params(ct);
      for (var key in params) this[key] = params[key];

      this.links = {};

      // links
      try {
        if (header.link) {
          this.links = utils.parseLinks(header.link);
        }
      }
      catch (err) {
        // ignore
      }
    };

    /**
     * Set flags such as `.ok` based on `status`.
     *
     * For example a 2xx response will give you a `.ok` of __true__
     * whereas 5xx will be __false__ and `.error` will be __true__. The
     * `.clientError` and `.serverError` are also available to be more
     * specific, and `.statusType` is the class of error ranging from 1..5
     * sometimes useful for mapping respond colors etc.
     *
     * "sugar" properties are also defined for common cases. Currently providing:
     *
     *   - .noContent
     *   - .badRequest
     *   - .unauthorized
     *   - .notAcceptable
     *   - .notFound
     *
     * @param {Number} status
     * @api private
     */

    ResponseBase.prototype._setStatusProperties = function (status) {
      var type = status / 100 | 0;

      // status / class
      this.status = this.statusCode = status;
      this.statusType = type;

      // basics
      this.info = 1 == type;
      this.ok = 2 == type;
      this.redirect = 3 == type;
      this.clientError = 4 == type;
      this.serverError = 5 == type;
      this.error = (4 == type || 5 == type) ?
        this.toError() :
        false;

      // sugar
      this.created = 201 == status;
      this.accepted = 202 == status;
      this.noContent = 204 == status;
      this.badRequest = 400 == status;
      this.unauthorized = 401 == status;
      this.notAcceptable = 406 == status;
      this.forbidden = 403 == status;
      this.notFound = 404 == status;
      this.unprocessableEntity = 422 == status;
    };

}, { "./utils": 15 }],
  15: [function (require, module, exports) {
    'use strict';

    /**
     * Return the mime type for the given `str`.
     *
     * @param {String} str
     * @return {String}
     * @api private
     */

    exports.type = function (str) {
      return str.split(/ *; */).shift();
    };

    /**
     * Return header field parameters.
     *
     * @param {String} str
     * @return {Object}
     * @api private
     */

    exports.params = function (str) {
      return str.split(/ *; */).reduce(function (obj, str) {
        var parts = str.split(/ *= */);
        var key = parts.shift();
        var val = parts.shift();

        if (key && val) obj[key] = val;
        return obj;
      }, {});
    };

    /**
     * Parse Link header fields.
     *
     * @param {String} str
     * @return {Object}
     * @api private
     */

    exports.parseLinks = function (str) {
      return str.split(/ *, */).reduce(function (obj, str) {
        var parts = str.split(/ *; */);
        var url = parts[0].slice(1, -1);
        var rel = parts[1].split(/ *= */)[1].slice(1, -1);
        obj[rel] = url;
        return obj;
      }, {});
    };

    /**
     * Strip content related fields from `header`.
     *
     * @param {Object} header
     * @return {Object} header
     * @api private
     */

    exports.cleanHeader = function (header, changesOrigin) {
      delete header['content-type'];
      delete header['content-length'];
      delete header['transfer-encoding'];
      delete header['host'];
      // secuirty
      if (changesOrigin) {
        delete header['authorization'];
        delete header['cookie'];
      }
      return header;
    };

}, {}]
}, {}, [1]);
