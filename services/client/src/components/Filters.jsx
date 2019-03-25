import React from 'react';
import PropTypes from 'prop-types';

import { Field, FieldLabel, Checkbox } from 'bloomer';

import startCase from 'lodash/startCase';

function Filters(props) {
  const { filters, glossaries, toggleFilter } = props;

  return (
    <div>
      {
        Object.entries(filters).map(([cat, catFilters]) => {
          const { [cat]: glossary } = glossaries;

          return (
            <Field key={cat} isGrouped>
              <FieldLabel>{startCase(cat)}</FieldLabel>
              {
                Object.entries(catFilters).map(([id, enabled]) => (
                  <Checkbox
                    key={id}
                    checked={enabled}
                    readOnly
                    onClick={() => toggleFilter(cat, id)}
                  >
                    {glossary[id].name}
                  </Checkbox>
                ))
              }
            </Field>
          );
        })
      }
    </div>
  );
}

Filters.propTypes = {
  filters: PropTypes.objectOf(PropTypes.object).isRequired,
  glossaries: PropTypes.objectOf(PropTypes.object).isRequired,
  toggleFilter: PropTypes.func.isRequired,
};

export default Filters;
