import { ReactNode } from 'react'
import Confirmation from "src/@core/components/membership/confirmation";
import BlankLayout from 'src/@core/layouts/BlankLayout'

function ConfirmationPage() {

  return (
    <Confirmation />
  )

}



ConfirmationPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default ConfirmationPage;
