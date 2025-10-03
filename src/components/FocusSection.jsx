import React, { useEffect, useRef } from 'react';

// Emphasize exactly one section at a time while scrolling.
// Adds 'in-focus' to the currently visible section and removes from others.
const registry = new Set();

export default function FocusSection({
  as: Tag = 'div',
  className = '',
  children,
  threshold = 0.6,
  rootMargin = '0px 0px -10% 0px',
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;
    registry.add(el);
    el.classList.add('focus-section');

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Remove focus from all others to emphasize one at a time
          registry.forEach((node) => {
            if (node !== el) node.classList.remove('in-focus');
          });
          el.classList.add('in-focus');
        } else {
          el.classList.remove('in-focus');
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      registry.delete(el);
    };
  }, [threshold, rootMargin]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

