import React from 'react';
import { Formik, Form, useField, useFormikContext } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { getAdress } from './services';

const validationSchema = yup.object({
  cep: yup.string('Digite o seu CEP').required('O CEP é obrigatório'),
});

async function fetchAdress(cepNumber) {
  const response = await getAdress(cepNumber);
  return response.data;
}

const MyField = (props) => {
  console.log(props);
  const {
    values: { cep },
    setFieldValue,
  } = useFormikContext();
  const [field, meta] = useField(props);

  React.useEffect(() => {
    let isCurrent = true;
    // lógica que irá dizer quando fazer o fetch
    if (cep.trim() !== '' && cep.length === 8) {
      fetchAdress(cep).then((data) => {
        if (!!isCurrent) {
          // previne de colocar valores antigos
          setFieldValue(props.name, data.logradouro);
        }
      });
    }
    return () => {
      isCurrent = false;
    };
  }, [cep, setFieldValue, props.name]);

  return (
    <>
      <TextField {...props} {...field} />
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};

const App = () => {
  const initialValues = { cep: '', rua: '' };

  const handleSubmit = async (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className="App">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gridGap: '20px',
            }}
          >
            <TextField
              fullWidth
              id="cep"
              name="cep"
              label="CEP"
              value={props.values.cep}
              onChange={props.handleChange}
              error={props.touched.cep && Boolean(props.errors.cep)}
              helperText={props.touched.cep && props.errors.cep}
            />

            <MyField fullWidth id="rua" name="rua" label="Rua" />

            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
