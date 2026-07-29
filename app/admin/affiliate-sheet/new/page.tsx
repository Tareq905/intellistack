import AffiliateSheetForm from '../../_components/AffiliateSheetForm'

export default function NewAffiliateSheetEntryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">Add Affiliate Entry</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
          This will save a new row to your database.
        </p>
      </div>
      <AffiliateSheetForm />
    </div>
  )
}
