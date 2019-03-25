import React from 'react';
import PropTypes from 'prop-types';

import {
  Field, FieldLabel, Checkbox, Card 
} from 'bloomer';

import startCase from 'lodash/startCase';

function Filters(props) {
  const { filters, glossaries, toggleFilter } = props;

  return (
    <Card>
      {
        Object.entries(filters).map(([cat, catFilters]) => {
          const { [cat]: glossary } = glossaries;

          return (
            <Field key={cat} isGrouped>
              <FieldLabel>{`${startCase(cat)}:`}</FieldLabel>
              {
                Object.entries(catFilters).map(([id, checked]) => (
                  <Checkbox
                    {...{ key: id, checked }}
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
    </Card>
  );
}

Filters.propTypes = {
  filters: PropTypes.objectOf(PropTypes.object).isRequired,
  glossaries: PropTypes.objectOf(PropTypes.object).isRequired,
  toggleFilter: PropTypes.func.isRequired,
};

export default Filters;
