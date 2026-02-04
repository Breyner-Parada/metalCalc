import React from "react";
import Image from "next/image";

type Action = {
  label: string;
  onClick?: () => void;
  href?: string;
};

type CardProps = {
  title: string;
  subtitle?: string;
  image?: string;
  children?: React.ReactNode;
  tags?: string[];
  primaryAction?: Action;
  secondaryAction?: Action;
};

type ActionButtonProps = {
  action?: Action;
  primary?: boolean;
};

const ActionButton: React.FC<ActionButtonProps> = ({ action, primary }) => {
  if (!action) return null;
  const base =
    "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const primaryCls =
    "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow hover:from-indigo-600 hover:to-purple-600";
  const secondaryCls =
    "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border hover:bg-gray-50";

  const cls = `${base} ${primary ? primaryCls : secondaryCls}`;

  if (action.href)
    return (
      <a href={action.href} className={cls} aria-label={action.label}>
        {action.label}
      </a>
    );

  return (
    <button onClick={action.onClick} className={cls} aria-label={action.label}>
      {action.label}
    </button>
  );
};

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  image,
  children,
  tags = [],
  primaryAction,
  secondaryAction,
}) => {
  return (
    <article className="max-w-sm w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
      {image ? (
        <div className="w-full h-48 overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            width={400}
            height={192}
          />
        </div>
      ) : (
        <div className="w-full h-12 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-800" />
      )}

      <div className="p-5 space-y-4">
        <header>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              {subtitle}
            </p>
          )}
        </header>

        {children && (
          <div className="text-sm text-gray-700 dark:text-gray-200">
            {children}
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 px-2 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {(primaryAction || secondaryAction) && (
          <div className="flex items-center gap-3 pt-2">
            {primaryAction && <ActionButton action={primaryAction} primary />}
            {secondaryAction && <ActionButton action={secondaryAction} />}
          </div>
        )}
      </div>
    </article>
  );
};

export default Card;
