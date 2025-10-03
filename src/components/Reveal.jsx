import React, { useEffect, useRef } from 'react';

export default function Reveal({
  as: Tag = 'div',
  className = '',
  children,
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  once = false,
  delay = 0,
  style,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;
    el.classList.add('reveal-up');

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed');
        } else if (!once) {
          el.classList.remove('is-revealed');
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  const mergedStyle = {
    ...style,
    transitionDelay: typeof delay === 'number' ? `${delay}ms` : delay,
  };

  return (
    <Tag ref={ref} className={className} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}
