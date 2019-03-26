import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

import {
  Field, FieldLabel, Checkbox, Card,
} from 'bloomer';

import startCase from 'lodash/startCase';

const size = {
  fontSize: '13px',
  padding: '10px',
  height: 'auto',
  width: '70%',
  margin: 'auto',
  marginTop: '30px',
  minWidth: '300px',
  marginBottom: '50px',
  borderRadius: '4px',
};

const margin = {
  marginRight: '6px',
  textAlign: 'center',
};

const field = {
  padding: '10px',
  marginRight: '5px',
};

function Filters(props) {
  const { filters, glossaries, toggleFilter } = props;

  return (
    <Card style={size} className="filter">
      {
        Object.entries(filters).map(([cat, catFilters]) => {
          const { [cat]: glossary } = glossaries;

          return (
            <Field key={cat}>
              <FieldLabel style={margin}><strong>{`${startCase(cat)}:`}</strong></FieldLabel>
              {
                Object.entries(catFilters).map(([id, checked]) => (
                  <Checkbox
                    {...{ key: id, checked }}
                    readOnly
                    onClick={() => toggleFilter(cat, id)}
                    style={field}
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
