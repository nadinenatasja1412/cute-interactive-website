import { useRef, useEffect } from "react";

export default function DraggableCharacter({
  color = "#FF8A65",
  darkColor = "#E56B49",
  initialLeft = "10%",
  initialTop = "50%",
  boundsRef,
}) {
  const elRef = useRef(null);

  // semua nilai yang berubah tiap frame disimpan di ref,
  // BUKAN di useState, supaya tidak trigger re-render tiap frame
  const drag = useRef({
    offsetX: 0,
    offsetY: 0,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    vx: 0,
    vy: 0,
    fallRAF: null,
  });

  const GRAVITY = 0.6;
  const BOUNCE_DAMP = 0.45;
  const FRICTION = 0.985;

  useEffect(() => {
    const el = elRef.current;
    const state = drag.current;

    function getBounds() {
      const container = boundsRef?.current;
      const width = container ? container.clientWidth : window.innerWidth;
      const height = container ? container.clientHeight : window.innerHeight;
      return {
        maxLeft: width - el.offsetWidth,
        maxTop: height - el.offsetHeight,
      };
    }

    function stopFalling() {
      if (state.fallRAF) cancelAnimationFrame(state.fallRAF);
      state.fallRAF = null;
    }

    function startFalling() {
      stopFalling();

      function tick() {
        let left = parseFloat(el.style.left);
        let top = parseFloat(el.style.top);
        const { maxLeft, maxTop } = getBounds();

        state.vy += GRAVITY;
        left += state.vx;
        top += state.vy;

        if (left < 0) {
          left = 0;
          state.vx *= -BOUNCE_DAMP;
        }
        if (left > maxLeft) {
          left = maxLeft;
          state.vx *= -BOUNCE_DAMP;
        }

        if (top >= maxTop) {
          top = maxTop;
          state.vy *= -BOUNCE_DAMP;
          state.vx *= FRICTION;

          if (Math.abs(state.vy) < 1.2 && Math.abs(state.vx) < 0.3) {
            state.vy = 0;
            state.vx = 0;
            el.style.left = left + "px";
            el.style.top = top + "px";
            stopFalling();
            return;
          }
        }

        el.style.left = left + "px";
        el.style.top = top + "px";
        state.fallRAF = requestAnimationFrame(tick);
      }

      state.fallRAF = requestAnimationFrame(tick);
    }

    function onPointerDown(e) {
      stopFalling();
      el.setPointerCapture(e.pointerId);
      const rect = el.getBoundingClientRect();
      const parentRect = (boundsRef?.current ?? document.body).getBoundingClientRect();

      state.offsetX = e.clientX - rect.left;
      state.offsetY = e.clientY - rect.top;
      el.classList.add("lifted");

      el.style.left = rect.left - parentRect.left + "px";
      el.style.top = rect.top - parentRect.top + "px";

      state.lastX = e.clientX;
      state.lastY = e.clientY;
      state.lastT = performance.now();
      state.vx = 0;
      state.vy = 0;

      function onMove(ev) {
        const parentRect = (boundsRef?.current ?? document.body).getBoundingClientRect();
        let newLeft = ev.clientX - state.offsetX - parentRect.left;
        let newTop = ev.clientY - state.offsetY - parentRect.top;

        const { maxLeft, maxTop } = getBounds();
        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));

        el.style.left = newLeft + "px";
        el.style.top = newTop + "px";

        const now = performance.now();
        const dt = Math.max(now - state.lastT, 1);
        state.vx = ((ev.clientX - state.lastX) / dt) * 16;
        state.vy = ((ev.clientY - state.lastY) / dt) * 16;
        state.lastX = ev.clientX;
        state.lastY = ev.clientY;
        state.lastT = now;
      }

      function onUp(ev) {
        el.classList.remove("lifted");
        el.releasePointerCapture(ev.pointerId);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        startFalling();
      }

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
    }

    el.addEventListener("pointerdown", onPointerDown);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      stopFalling();
    };
  }, [boundsRef]);

  return (
    <div
      ref={elRef}
      className="draggable-char"
      style={{
        position: "absolute",
        left: initialLeft,
        top: initialTop,
        width: 100,
        height: 100,
        cursor: "grab",
        touchAction: "none",
        filter: "drop-shadow(0 8px 10px rgba(20,40,30,.18))",
      }}
    >
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <ellipse cx="60" cy="105" rx="30" ry="7" fill="rgba(20,40,30,0.15)" />
        <circle cx="60" cy="62" r="46" fill={color} />
        <circle cx="60" cy="62" r="46" fill="none" stroke={darkColor} strokeWidth="3" />
        <circle cx="45" cy="55" r="7" fill="#20342E" />
        <circle cx="77" cy="55" r="7" fill="#20342E" />
        <path d="M45 75 Q60 88 77 75" stroke="#20342E" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}