import React from 'react';

type Props = {
  className?: string;
};

export function ActionIcon({ className, ...otherProps }: Props & React.SVGAttributes<SVGElement>) {
  return (
    <svg className={className} {...otherProps} viewBox="5 5 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Action-icon-tabell">
        <g id="icon_svg_20px_context_menu">
          <g id="icon_svg_20px_context_menu_2">
            <path
              id="Ellipse 77"
              d="M14.7 11.401C15.6389 11.401 16.4 10.6399 16.4 9.70098C16.4 8.76209 15.6389 8.00098 14.7 8.00098C13.7611 8.00098 13 8.76209 13 9.70098C13 10.6399 13.7611 11.401 14.7 11.401Z"
              fill="currentColor"
            />
            <path
              id="Ellipse 78"
              d="M14.7 16.5006C15.6389 16.5006 16.4 15.7395 16.4 14.8006C16.4 13.8617 15.6389 13.1006 14.7 13.1006C13.7611 13.1006 13 13.8617 13 14.8006C13 15.7395 13.7611 16.5006 14.7 16.5006Z"
              fill="currentColor"
            />
            <path
              id="Ellipse 79"
              d="M14.7 21.6012C15.6389 21.6012 16.4 20.8401 16.4 19.9012C16.4 18.9623 15.6389 18.2012 14.7 18.2012C13.7611 18.2012 13 18.9623 13 19.9012C13 20.8401 13.7611 21.6012 14.7 21.6012Z"
              fill="currentColor"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
