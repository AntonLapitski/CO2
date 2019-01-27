import React from "react";

function ParamCardHeader(props) {
  const { cardName, handleToggle, iconClassName, settings } = props;
  return (
    <div className="param-card__header">
      <div className="param-name">
        <i className={iconClassName} aria-hidden="true" />
        {` ${cardName}`}
      </div>
      {settings ? (
        <i
          onClick={handleToggle}
          className="fa fa-cog fa-lg"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}

export default ParamCardHeader;
/**
 *      className="btn-param-settings">
 */
