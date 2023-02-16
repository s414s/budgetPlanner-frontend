import { Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signUp';
import App from './pages/app';
import AppSide from './pages/appSideMenu';

import BudgetList from './components/budgets/list';
import ListBudgetShared from './components/budgets/sharedList';
import RecyclingBin from './components/budgets/recyclingBin';
import FoldersList from './components/folders/list';
import GroupsList from './components/groups/list';
import ItemsList from './components/items/list';

const RouterAPP = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />}></Route>
      <Route path="signup" element={<SignUp />}></Route>

      <Route path="app/budgets" element={<AppSide container={<BudgetList />} />}></Route>
      <Route path="app/sharedbudgets" element={<AppSide container={<ListBudgetShared />} />}></Route>
      <Route path="app/bin" element={<AppSide container={<RecyclingBin />} />}></Route>
      <Route path="app/decomp/folders/:idBudget?" element={<App container={<FoldersList />} />}></Route>
      <Route path="app/decomp/groups/:idFolder?" element={<App container={<GroupsList />} />}></Route>
      <Route path="app/decomp/items/:idGroup?" element={<App container={<ItemsList />} />}></Route>

      <Route path="app/items/:idBudget?" element={<App container={<ItemsList />} />}></Route>

    </Routes>
  );
};

export default RouterAPP;