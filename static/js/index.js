!(function () {
  var deflate = (function () {
    var e,
      n,
      r,
      t,
      i,
      o,
      a,
      f,
      d,
      l,
      c,
      u,
      h,
      w,
      m,
      s,
      g,
      p,
      y,
      _,
      v,
      x,
      A,
      C,
      b,
      V,
      E,
      z,
      I,
      S,
      B,
      G,
      L,
      M,
      O,
      D,
      N,
      q,
      T,
      k,
      H,
      U,
      j,
      F,
      P,
      R,
      J,
      K,
      Q,
      W,
      X,
      Y,
      Z,
      $,
      ee,
      ne,
      re = 32768,
      te = 0,
      ie = 1,
      oe = 2,
      ae = 6,
      fe = !0,
      de = 32768,
      le = 64,
      ce = 8192,
      ue = 2 * re,
      he = 3,
      we = 258,
      me = 16,
      se = 8192,
      ge = se,
      pe = 8192,
      ye = pe - 1,
      _e = re - 1,
      ve = 0,
      xe = 4096,
      Ae = we + he + 1,
      Ce = re - Ae,
      be = 1,
      Ve = 15,
      Ee = 7,
      ze = 29,
      Ie = 256,
      Se = 256,
      Be = Ie + 1 + ze,
      Ge = 30,
      Le = 19,
      Me = 16,
      Oe = 17,
      De = 18,
      Ne = 2 * Be + 1,
      qe = parseInt((13 + he - 1) / he),
      Te = null;
    function ke() {
      (this.fc = 0), (this.dl = 0);
    }
    function He() {
      (this.dyn_tree = null),
        (this.static_tree = null),
        (this.extra_bits = null),
        (this.extra_base = 0),
        (this.elems = 0),
        (this.max_length = 0),
        (this.max_code = 0);
    }
    function Ue(e, n, r, t) {
      (this.good_length = e),
        (this.max_lazy = n),
        (this.nice_length = r),
        (this.max_chain = t);
    }
    var je = [
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4,
        4, 4, 5, 5, 5, 5, 0,
      ],
      Fe = [
        0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9,
        10, 10, 11, 11, 12, 12, 13, 13,
      ],
      Pe = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
      Re = [
        16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
      ],
      Je = [
        new Ue(0, 0, 0, 0),
        new Ue(4, 4, 8, 4),
        new Ue(4, 5, 16, 8),
        new Ue(4, 6, 32, 32),
        new Ue(4, 4, 16, 16),
        new Ue(8, 16, 32, 32),
        new Ue(8, 16, 128, 128),
        new Ue(8, 32, 128, 256),
        new Ue(32, 128, 258, 1024),
        new Ue(32, 258, 258, 4096),
      ];
    function Ke() {
      var n;
      return (
        null != e
          ? ((n = e), (e = e.next))
          : (n = new (function () {
              (this.next = null),
                (this.len = 0),
                (this.ptr = new Array(ce)),
                (this.off = 0);
            })()),
        (n.next = null),
        (n.len = n.off = 0),
        n
      );
    }
    function Qe(e) {
      return c[re + e];
    }
    function We(e, n) {
      return (c[re + e] = n);
    }
    function Xe(e) {
      (Te[o + i++] = e),
        o + i == ce &&
          (function () {
            if (0 != i) {
              var e, t;
              for (
                e = Ke(),
                  null == n ? (n = r = e) : (r = r.next = e),
                  e.len = i - o,
                  t = 0;
                t < e.len;
                t++
              )
                e.ptr[t] = Te[o + t];
              i = o = 0;
            }
          })();
    }
    function Ye(e) {
      (e &= 65535),
        o + i < ce - 2
          ? ((Te[o + i++] = 255 & e), (Te[o + i++] = e >>> 8))
          : (Xe(255 & e), Xe(e >>> 8));
    }
    function Ze() {
      (m = ((m << qe) ^ (255 & f[v + he - 1])) & ye),
        (s = Qe(m)),
        (c[v & _e] = s),
        We(m, v);
    }
    function $e(e, n) {
      _n(n[e].fc, n[e].dl);
    }
    function en(e) {
      return 255 & (e < 256 ? F[e] : F[256 + (e >> 7)]);
    }
    function nn(e, n, r) {
      return e[n].fc < e[r].fc || (e[n].fc == e[r].fc && U[n] <= U[r]);
    }
    function rn(e, n, r) {
      var t;
      for (t = 0; t < r && ne < ee.length; t++)
        e[n + t] = 255 & ee.charCodeAt(ne++);
      return t;
    }
    function tn(e) {
      var n,
        r,
        t = b,
        i = v,
        o = _,
        a = v > Ce ? v - Ce : ve,
        d = v + we,
        l = f[i + o - 1],
        u = f[i + o];
      _ >= z && (t >>= 2);
      do {
        if (
          f[(n = e) + o] == u &&
          f[n + o - 1] == l &&
          f[n] == f[i] &&
          f[++n] == f[i + 1]
        ) {
          (i += 2), n++;
          do {} while (
            f[++i] == f[++n] &&
            f[++i] == f[++n] &&
            f[++i] == f[++n] &&
            f[++i] == f[++n] &&
            f[++i] == f[++n] &&
            f[++i] == f[++n] &&
            f[++i] == f[++n] &&
            f[++i] == f[++n] &&
            i < d
          );
          if (((r = we - (d - i)), (i = d - we), r > o)) {
            if (((x = e), (o = r), fe)) {
              if (r >= we) break;
            } else if (r >= I) break;
            (l = f[i + o - 1]), (u = f[i + o]);
          }
        }
      } while ((e = c[e & _e]) > a && 0 != --t);
      return o;
    }
    function on() {
      var e,
        n,
        r = ue - C - v;
      if (-1 == r) r--;
      else if (v >= re + Ce) {
        for (e = 0; e < re; e++) f[e] = f[e + re];
        for (x -= re, v -= re, w -= re, e = 0; e < pe; e++)
          We(e, (n = Qe(e)) >= re ? n - re : ve);
        for (e = 0; e < re; e++)
          (n = c[e]), (c[e] = n >= re ? n - re : ve);
        r += re;
      }
      A || ((e = rn(f, v + C, r)) <= 0 ? (A = !0) : (C += e));
    }
    function an() {
      A ||
        ((u = 0),
        (h = 0),
        (function () {
          var e, n, r, t, i;
          if (0 != L[0].dl) return;
          for (
            O.dyn_tree = S,
              O.static_tree = G,
              O.extra_bits = je,
              O.extra_base = Ie + 1,
              O.elems = Be,
              O.max_length = Ve,
              O.max_code = 0,
              D.dyn_tree = B,
              D.static_tree = L,
              D.extra_bits = Fe,
              D.extra_base = 0,
              D.elems = Ge,
              D.max_length = Ve,
              D.max_code = 0,
              N.dyn_tree = M,
              N.static_tree = null,
              N.extra_bits = Pe,
              N.extra_base = 0,
              N.elems = Le,
              N.max_length = Ee,
              N.max_code = 0,
              r = 0,
              t = 0;
            t < ze - 1;
            t++
          )
            for (P[t] = r, e = 0; e < 1 << je[t]; e++) j[r++] = t;
          for (j[r - 1] = t, i = 0, t = 0; t < 16; t++)
            for (R[t] = i, e = 0; e < 1 << Fe[t]; e++) F[i++] = t;
          for (i >>= 7; t < Ge; t++)
            for (R[t] = i << 7, e = 0; e < 1 << (Fe[t] - 7); e++)
              F[256 + i++] = t;
          for (n = 0; n <= Ve; n++) q[n] = 0;
          e = 0;
          for (; e <= 143; ) (G[e++].dl = 8), q[8]++;
          for (; e <= 255; ) (G[e++].dl = 9), q[9]++;
          for (; e <= 279; ) (G[e++].dl = 7), q[7]++;
          for (; e <= 287; ) (G[e++].dl = 8), q[8]++;
          for (un(G, Be + 1), e = 0; e < Ge; e++)
            (L[e].dl = 5), (L[e].fc = vn(e, 5));
          ln();
        })(),
        (function () {
          var e;
          for (e = 0; e < pe; e++) c[re + e] = 0;
          if (
            ((V = Je[E].max_lazy),
            (z = Je[E].good_length),
            fe || (I = Je[E].nice_length),
            (b = Je[E].max_chain),
            (v = 0),
            (w = 0),
            (C = rn(f, 0, 2 * re)) <= 0)
          )
            return (A = !0), void (C = 0);
          for (A = !1; C < Ae && !A; ) on();
          for (m = 0, e = 0; e < he - 1; e++)
            m = ((m << qe) ^ (255 & f[e])) & ye;
        })(),
        (n = null),
        (i = 0),
        (o = 0),
        E <= 3 ? ((_ = he - 1), (y = 0)) : ((y = he - 1), (p = 0)),
        (a = !1));
    }
    function fn(e, r, i) {
      var o;
      return t || (an(), (t = !0), 0 != C)
        ? (o = dn(e, r, i)) == i
          ? i
          : a
          ? o
          : (E <= 3
              ? (function () {
                  for (; 0 != C && null == n; ) {
                    var e;
                    if (
                      (Ze(),
                      s != ve &&
                        v - s <= Ce &&
                        (y = tn(s)) > C &&
                        (y = C),
                      y >= he)
                    )
                      if (((e = gn(v - x, y - he)), (C -= y), y <= V)) {
                        y--;
                        do {
                          v++, Ze();
                        } while (0 != --y);
                        v++;
                      } else
                        (v += y),
                          (y = 0),
                          (m =
                            (((m = 255 & f[v]) << qe) ^
                              (255 & f[v + 1])) &
                            ye);
                    else (e = gn(0, 255 & f[v])), C--, v++;
                    for (e && (sn(0), (w = v)); C < Ae && !A; ) on();
                  }
                })()
              : (function () {
                  for (; 0 != C && null == n; ) {
                    if (
                      (Ze(),
                      (_ = y),
                      (g = x),
                      (y = he - 1),
                      s != ve &&
                        _ < V &&
                        v - s <= Ce &&
                        ((y = tn(s)) > C && (y = C),
                        y == he && v - x > xe && y--),
                      _ >= he && y <= _)
                    ) {
                      var e;
                      (e = gn(v - 1 - g, _ - he)), (C -= _ - 1), (_ -= 2);
                      do {
                        v++, Ze();
                      } while (0 != --_);
                      (p = 0), (y = he - 1), v++, e && (sn(0), (w = v));
                    } else
                      0 != p
                        ? (gn(0, 255 & f[v - 1]) && (sn(0), (w = v)),
                          v++,
                          C--)
                        : ((p = 1), v++, C--);
                    for (; C < Ae && !A; ) on();
                  }
                })(),
            0 == C && (0 != p && gn(0, 255 & f[v - 1]), sn(1), (a = !0)),
            o + dn(e, o + r, i - o))
        : ((a = !0), 0);
    }
    function dn(r, t, a) {
      var f, d, l, c;
      for (f = 0; null != n && f < a; ) {
        for ((d = a - f) > n.len && (d = n.len), l = 0; l < d; l++)
          r[t + f + l] = n.ptr[n.off + l];
        var u;
        if (((n.off += d), (n.len -= d), (f += d), 0 == n.len))
          (u = n), (n = n.next), ((c = u).next = e), (e = c);
      }
      if (f == a) return f;
      if (o < i) {
        for ((d = a - f) > i - o && (d = i - o), l = 0; l < d; l++)
          r[t + f + l] = Te[o + l];
        (f += d), i == (o += d) && (i = o = 0);
      }
      return f;
    }
    function ln() {
      var e;
      for (e = 0; e < Be; e++) S[e].fc = 0;
      for (e = 0; e < Ge; e++) B[e].fc = 0;
      for (e = 0; e < Le; e++) M[e].fc = 0;
      (S[Se].fc = 1), (Z = $ = 0), (K = Q = W = 0), (X = 0), (Y = 1);
    }
    function cn(e, n) {
      for (
        var r = T[n], t = n << 1;
        t <= k &&
        (t < k && nn(e, T[t + 1], T[t]) && t++, !nn(e, r, T[t]));

      )
        (T[n] = T[t]), (n = t), (t <<= 1);
      T[n] = r;
    }
    function un(e, n) {
      var r,
        t,
        i = new Array(Ve + 1),
        o = 0;
      for (r = 1; r <= Ve; r++) (o = (o + q[r - 1]) << 1), (i[r] = o);
      for (t = 0; t <= n; t++) {
        var a = e[t].dl;
        0 != a && (e[t].fc = vn(i[a]++, a));
      }
    }
    function hn(e) {
      var n,
        r,
        t = e.dyn_tree,
        i = e.static_tree,
        o = e.elems,
        a = -1,
        f = o;
      for (k = 0, H = Ne, n = 0; n < o; n++)
        0 != t[n].fc ? ((T[++k] = a = n), (U[n] = 0)) : (t[n].dl = 0);
      for (; k < 2; ) {
        var d = (T[++k] = a < 2 ? ++a : 0);
        (t[d].fc = 1), (U[d] = 0), Z--, null != i && ($ -= i[d].dl);
      }
      for (e.max_code = a, n = k >> 1; n >= 1; n--) cn(t, n);
      do {
        (n = T[be]),
          (T[be] = T[k--]),
          cn(t, be),
          (r = T[be]),
          (T[--H] = n),
          (T[--H] = r),
          (t[f].fc = t[n].fc + t[r].fc),
          U[n] > U[r] + 1 ? (U[f] = U[n]) : (U[f] = U[r] + 1),
          (t[n].dl = t[r].dl = f),
          (T[be] = f++),
          cn(t, be);
      } while (k >= 2);
      (T[--H] = T[be]),
        (function (e) {
          var n,
            r,
            t,
            i,
            o,
            a,
            f = e.dyn_tree,
            d = e.extra_bits,
            l = e.extra_base,
            c = e.max_code,
            u = e.max_length,
            h = e.static_tree,
            w = 0;
          for (i = 0; i <= Ve; i++) q[i] = 0;
          for (f[T[H]].dl = 0, n = H + 1; n < Ne; n++)
            (i = f[f[(r = T[n])].dl].dl + 1) > u && ((i = u), w++),
              (f[r].dl = i),
              r > c ||
                (q[i]++,
                (o = 0),
                r >= l && (o = d[r - l]),
                (a = f[r].fc),
                (Z += a * (i + o)),
                null != h && ($ += a * (h[r].dl + o)));
          if (0 != w) {
            do {
              for (i = u - 1; 0 == q[i]; ) i--;
              q[i]--, (q[i + 1] += 2), q[u]--, (w -= 2);
            } while (w > 0);
            for (i = u; 0 != i; i--)
              for (r = q[i]; 0 != r; )
                (t = T[--n]) > c ||
                  (f[t].dl != i &&
                    ((Z += (i - f[t].dl) * f[t].fc), (f[t].fc = i)),
                  r--);
          }
        })(e),
        un(t, a);
    }
    function wn(e, n) {
      var r,
        t,
        i = -1,
        o = e[0].dl,
        a = 0,
        f = 7,
        d = 4;
      for (
        0 == o && ((f = 138), (d = 3)), e[n + 1].dl = 65535, r = 0;
        r <= n;
        r++
      )
        (t = o),
          (o = e[r + 1].dl),
          (++a < f && t == o) ||
            (a < d
              ? (M[t].fc += a)
              : 0 != t
              ? (t != i && M[t].fc++, M[Me].fc++)
              : a <= 10
              ? M[Oe].fc++
              : M[De].fc++,
            (a = 0),
            (i = t),
            0 == o
              ? ((f = 138), (d = 3))
              : t == o
              ? ((f = 6), (d = 3))
              : ((f = 7), (d = 4)));
    }
    function mn(e, n) {
      var r,
        t,
        i = -1,
        o = e[0].dl,
        a = 0,
        f = 7,
        d = 4;
      for (0 == o && ((f = 138), (d = 3)), r = 0; r <= n; r++)
        if (((t = o), (o = e[r + 1].dl), !(++a < f && t == o))) {
          if (a < d)
            do {
              $e(t, M);
            } while (0 != --a);
          else
            0 != t
              ? (t != i && ($e(t, M), a--), $e(Me, M), _n(a - 3, 2))
              : a <= 10
              ? ($e(Oe, M), _n(a - 3, 3))
              : ($e(De, M), _n(a - 11, 7));
          (a = 0),
            (i = t),
            0 == o
              ? ((f = 138), (d = 3))
              : t == o
              ? ((f = 6), (d = 3))
              : ((f = 7), (d = 4));
        }
    }
    function sn(e) {
      var n, r, t, i, o;
      if (
        ((i = v - w),
        (J[W] = X),
        hn(O),
        hn(D),
        (t = (function () {
          var e;
          for (
            wn(S, O.max_code), wn(B, D.max_code), hn(N), e = Le - 1;
            e >= 3 && 0 == M[Re[e]].dl;
            e--
          );
          return (Z += 3 * (e + 1) + 5 + 5 + 4), e;
        })()),
        (r = ($ + 3 + 7) >> 3) <= (n = (Z + 3 + 7) >> 3) && (n = r),
        i + 4 <= n && w >= 0)
      )
        for (_n((te << 1) + e, 3), xn(), Ye(i), Ye(~i), o = 0; o < i; o++)
          Xe(f[w + o]);
      else
        r == n
          ? (_n((ie << 1) + e, 3), pn(G, L))
          : (_n((oe << 1) + e, 3),
            (function (e, n, r) {
              var t;
              for (
                _n(e - 257, 5), _n(n - 1, 5), _n(r - 4, 4), t = 0;
                t < r;
                t++
              )
                _n(M[Re[t]].dl, 3);
              mn(S, e - 1), mn(B, n - 1);
            })(O.max_code + 1, D.max_code + 1, t + 1),
            pn(S, B));
      ln(), 0 != e && xn();
    }
    function gn(e, n) {
      if (
        ((l[K++] = n),
        0 == e
          ? S[n].fc++
          : (e--,
            S[j[n] + Ie + 1].fc++,
            B[en(e)].fc++,
            (d[Q++] = e),
            (X |= Y)),
        (Y <<= 1),
        0 == (7 & K) && ((J[W++] = X), (X = 0), (Y = 1)),
        E > 2 && 0 == (4095 & K))
      ) {
        var r,
          t = 8 * K,
          i = v - w;
        for (r = 0; r < Ge; r++) t += B[r].fc * (5 + Fe[r]);
        if (((t >>= 3), Q < parseInt(K / 2) && t < parseInt(i / 2)))
          return !0;
      }
      return K == se - 1 || Q == ge;
    }
    function pn(e, n) {
      var r,
        t,
        i,
        o,
        a = 0,
        f = 0,
        c = 0,
        u = 0;
      if (0 != K)
        do {
          0 == (7 & a) && (u = J[c++]),
            (t = 255 & l[a++]),
            0 == (1 & u)
              ? $e(t, e)
              : ($e((i = j[t]) + Ie + 1, e),
                0 != (o = je[i]) && _n((t -= P[i]), o),
                $e((i = en((r = d[f++]))), n),
                0 != (o = Fe[i]) && _n((r -= R[i]), o)),
            (u >>= 1);
        } while (a < K);
      $e(Se, e);
    }
    var yn = 16;
    function _n(e, n) {
      h > yn - n
        ? (Ye((u |= e << h)), (u = e >> (yn - h)), (h += n - yn))
        : ((u |= e << h), (h += n));
    }
    function vn(e, n) {
      var r = 0;
      do {
        (r |= 1 & e), (e >>= 1), (r <<= 1);
      } while (--n > 0);
      return r >> 1;
    }
    function xn() {
      h > 8 ? Ye(u) : h > 0 && Xe(u), (u = 0), (h = 0);
    }
    return function (i, o) {
      var a, u;
      (ee = i),
        (ne = 0),
        void 0 === o && (o = ae),
        (function (i) {
          var o;
          if (
            (i ? (i < 1 ? (i = 1) : i > 9 && (i = 9)) : (i = ae),
            (E = i),
            (t = !1),
            (A = !1),
            null == Te)
          ) {
            for (
              e = n = r = null,
                Te = new Array(ce),
                f = new Array(ue),
                d = new Array(ge),
                l = new Array(de + le),
                c = new Array(1 << me),
                S = new Array(Ne),
                o = 0;
              o < Ne;
              o++
            )
              S[o] = new ke();
            for (B = new Array(2 * Ge + 1), o = 0; o < 2 * Ge + 1; o++)
              B[o] = new ke();
            for (G = new Array(Be + 2), o = 0; o < Be + 2; o++)
              G[o] = new ke();
            for (L = new Array(Ge), o = 0; o < Ge; o++) L[o] = new ke();
            for (M = new Array(2 * Le + 1), o = 0; o < 2 * Le + 1; o++)
              M[o] = new ke();
            (O = new He()),
              (D = new He()),
              (N = new He()),
              (q = new Array(Ve + 1)),
              (T = new Array(2 * Be + 1)),
              (U = new Array(2 * Be + 1)),
              (j = new Array(we - he + 1)),
              (F = new Array(512)),
              (P = new Array(ze)),
              (R = new Array(Ge)),
              (J = new Array(parseInt(se / 8)));
          }
        })(o);
      for (
        var h = new Array(1024), w = [];
        (a = fn(h, 0, h.length)) > 0;

      ) {
        var m = new Array(a);
        for (u = 0; u < a; u++) m[u] = String.fromCharCode(h[u]);
        w[w.length] = m.join("");
      }
      return (ee = null), w.join("");
    };
  })();
  function encode64(e) {
    for (r = "", i = 0; i < e.length; i += 3)
      i + 2 == e.length
        ? (r += append3bytes(e.charCodeAt(i), e.charCodeAt(i + 1), 0))
        : i + 1 == e.length
        ? (r += append3bytes(e.charCodeAt(i), 0, 0))
        : (r += append3bytes(
            e.charCodeAt(i),
            e.charCodeAt(i + 1),
            e.charCodeAt(i + 2)
          ));
    return r;
  }
  function append3bytes(e, n, t) {
    return (
      (c1 = e >> 2),
      (c2 = ((3 & e) << 4) | (n >> 4)),
      (c3 = ((15 & n) << 2) | (t >> 6)),
      (c4 = 63 & t),
      (r = ""),
      (r += encode6bit(63 & c1)),
      (r += encode6bit(63 & c2)),
      (r += encode6bit(63 & c3)),
      (r += encode6bit(63 & c4)),
      r
    );
  }
  function encode6bit(e) {
    return e < 10
      ? String.fromCharCode(48 + e)
      : (e -= 10) < 26
      ? String.fromCharCode(65 + e)
      : (e -= 26) < 26
      ? String.fromCharCode(97 + e)
      : 0 == (e -= 26)
      ? "-"
      : 1 == e
      ? "_"
      : "?";
  }
  function insertAfter(e, n) {
    e.parentNode.insertBefore(n, e.nextSibling);
  }
  var mwebChartEleId = "mweb-chart-ele-",
    glNumber = 0;
  function drawOldSeq(e, n) {
    Diagram.parse(n).drawSVG(e, { theme: "simple" });
  }
  function drawOldFlow(e, n) {
    flowchart.parse(n).drawSVG(e);
  }
  function drawMermaid(e, n) {
    var r = document.getElementById(e);
    (r.className = "mermaid"), (r.innerHTML = n);
  }
  function drawPlantUML(e, n) {
    var r = document.getElementById(e),
      t = unescape(encodeURIComponent(n)),
      i =
        "https://www.plantuml.com/plantuml/svg/" +
        encode64(deflate(t, 9));
    r.innerHTML =
      '<a target="_blank" href="' + i + '"><img src="' + i + '" /></a>';
  }
  function drawViz_circo(e, n) {
    new Viz().renderSVGElement(n, { engine: "circo" }).then(function (n) {
      document.getElementById(e).appendChild(n);
    });
  }
  function drawViz_dot(e, n) {
    new Viz().renderSVGElement(n, { engine: "dot" }).then(function (n) {
      document.getElementById(e).appendChild(n);
    });
  }
  function drawViz_fdp(e, n) {
    new Viz().renderSVGElement(n, { engine: "fdp" }).then(function (n) {
      document.getElementById(e).appendChild(n);
    });
  }
  function drawViz_neato(e, n) {
    new Viz().renderSVGElement(n, { engine: "neato" }).then(function (n) {
      document.getElementById(e).appendChild(n);
    });
  }
  function drawViz_osage(e, n) {
    new Viz().renderSVGElement(n, { engine: "osage" }).then(function (n) {
      document.getElementById(e).appendChild(n);
    });
  }
  function drawViz_twopi(e, n) {
    new Viz().renderSVGElement(n, { engine: "twopi" }).then(function (n) {
      document.getElementById(e).appendChild(n);
    });
  }
  function drawECharts(eleIID, txt) {
    var ele = document.getElementById(eleIID);
    try {
      eval(txt);
      var myoption = option;
      (myoption.animation = !1),
        void 0 !== myoption.width
          ? (ele.style.width = myoption.width + 10 + "px")
          : (ele.style.width = "100%"),
        void 0 !== myoption.height
          ? (ele.style.height = myoption.height + 10 + "px")
          : (ele.style.height = "350px");
      var myChart = echarts.init(ele);
      myChart.setOption(myoption);
    } catch (e) {}
  }
  var init = function () {
    var e = [[".language-plantuml", drawPlantUML]];
    "undefined" != typeof Diagram &&
      e.push([".language-sequence", drawOldSeq]),
      "undefined" != typeof flowchart &&
        e.push([".language-flow", drawOldFlow]),
      "undefined" != typeof mermaid &&
        e.push([".language-mermaid", drawMermaid]),
      "undefined" != typeof Viz &&
        (e.push([".language-circo", drawViz_circo]),
        e.push([".language-dot", drawViz_dot]),
        e.push([".language-fdp", drawViz_fdp]),
        e.push([".language-neato", drawViz_neato]),
        e.push([".language-osage", drawViz_osage]),
        e.push([".language-twopi", drawViz_twopi])),
      "undefined" != typeof echarts &&
        e.push([".language-echarts", drawECharts]);
    for (var n = 0; n < e.length; n++)
      for (
        var r = e[n][0],
          t = e[n][1],
          i = document.querySelectorAll(r),
          o = 0;
        o < i.length;
        o++
      ) {
        var a = i[o],
          f = a.innerText || a.textContent;
        a = a.parentElement;
        var d = document.createElement("div"),
          l = mwebChartEleId + glNumber;
        glNumber++,
          (d.innerHTML = '<div id="' + l + '"></div>'),
          insertAfter(a, d),
          a.parentElement.removeChild(a),
          t(l, f);
      }
    "undefined" != typeof mermaid &&
      mermaid.initialize({ startOnLoad: !0 });
  };
  document.addEventListener("DOMContentLoaded", function (e) {
    init();
  });
})();
