import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FormSendCode from 'src/@core/components/membership/sendcode'

function SendCodePage() {

  return (
    <FormSendCode />
  )

}


SendCodePage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default SendCodePage;

