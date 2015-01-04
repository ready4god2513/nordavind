// Generated by CoffeeScript 1.7.1
(function() {
  window.showSettings = function() {
    return jQuery.ajax({
      url: "" + _root + "/get-settings",
      success: function(data) {
        return window.settings.create(data);
      }
    });
  };

  window.settings = {

    /*
     */
    create: function(content) {
      var rp, sess;
      showDialog(content);
      sess = store.get('lastfm');
      $('.lastfm').addClass(sess != null ? 'lastfm-enabled' : 'lastfm-disabled');
      if (sess != null) {
        $('.disable-lastfm').replaceHTML('%user%', sess.name);
      }
      $('#dialog').on('click', '.enable-lastfm', function(e) {
        e.preventDefault();
        $('.lastfm').attr('class', 'lastfm lastfm-loading');
        window.scrobble.startSession();
        return (function() {
          sess = store.get('lastfm');
          if (sess == null) {
            return;
          }
          this.clearInterval();
          $('.lastfm').attr('class', 'lastfm lastfm-enabled');
          if (sess != null) {
            return $('.disable-lastfm').replaceHTML('%user%', sess.name);
          }
        }).interval(500);
      });
      $('#dialog').on('click', '.disable-lastfm', function(e) {
        e.preventDefault();
        store.del('lastfm');
        window.settings.close();
        return showSettings();
      });
      rp = store.get('replaygain');
      $("input[name=replaygain][value=" + rp + "]").prop('checked', true);
      $('#gapless').val(store.get('gapless'));
      return $('.clear-localstorage').on('click', function() {
        window.localStorage.clear();
        return window.location.reload();
      });
    },

    /*
     */
    close: function() {
      var gapless;
      gapless = parseFloat($('#gapless').val());
      store.set('gapless', gapless);
      window.player._timeToStart = gapless;
      store.set('replaygain', $('input[name=replaygain]:checked').val() || 'album');
      window.player.setVol();
      return removeDialog();
    }
  };

}).call(this);