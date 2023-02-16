import { useEffect, useState } from "react";
import API from "../../../config/API";
import Loading from "../../theme/loading";

const ConceptInfo = ({ elementType, targetElementId }) => {

  const allTabs = ['description', 'measurements', 'conditions', 'waste'];

  const translator = {
    description: 'Descripción',
    measurements: 'Mediciones',
    conditions: 'Pliego de Condiciones',
    waste: 'Residuos'
  }

  const [state, setState] = useState({
    status: (targetElementId ? 'loading' : 'loaded'),
    activeTab: 'description',
    info: 'No information'
  });

  const awaitResponses = async () => {
    const response = await API.get(`${elementType}/${state.activeTab}/${targetElementId}`);

    setState({
      ...state,
      status: "loaded",
      info: response.data[0].info,
      targetElementId: targetElementId
    });
  };

  useEffect(() => {
    awaitResponses();
  }, [state.activeTab, targetElementId]);

  return (
    <section className="compConceptInfo">
      <ul className="nav nav-tabs">
        {
          allTabs.map(e => {
            return (
              <li className="nav-item" key={"concept" + e}>
                <a className={"nav-link" + (e === state.activeTab ? ' active' : '')}
                  onClick={() => setState({ ...state, activeTab: e })}
                  role="tab"
                  data-toggle="tab"
                > {translator[e]} </a>
              </li>
            )
          })
        }
      </ul>

      <div className="tab-content mt-3 px-4">
        {(state.status === 'loading' ? <Loading text={'loading...'} /> : state.info)}
      </div>
    </section>
  );
}

export default ConceptInfo;