import AffiliateLinkForm from '../../_components/AffiliateLinkForm'
export default function NewAffiliatePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">New Affiliate Link</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Add a new referral or affiliate link</p>
      </div>
      <AffiliateLinkForm />
    </div>
  )
}
