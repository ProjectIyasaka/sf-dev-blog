type Props = {
  type: 'hubspot' | 'zoho' | 'monday'
}

const affiliates = {
  hubspot: {
    name: 'HubSpot CRM',
    description: 'Salesforceより低コストで始められる無料CRM。中小企業に最適。',
    cta: '無料で始める',
    href: '#', // ← ASP登録後にアフィリエイトURLに差し替え
    color: 'bg-orange-50 border-orange-200',
    badge: '無料プランあり',
  },
  zoho: {
    name: 'Zoho CRM',
    description: 'Salesforceの1/3以下のコストで同等機能。日本語対応済み。',
    cta: '30日間無料トライアル',
    href: '#',
    color: 'bg-blue-50 border-blue-200',
    badge: '30日無料',
  },
  monday: {
    name: 'monday.com',
    description: '直感的なUI。SalesforceからのCRM移行先として人気急上昇。',
    cta: '無料トライアルを試す',
    href: '#',
    color: 'bg-purple-50 border-purple-200',
    badge: '14日無料',
  },
}

export default function AffiliateCard({ type }: Props) {
  const item = affiliates[type]
  return (
    <div className={`my-8 p-5 rounded-xl border-2 ${item.color}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold bg-gray-700 text-white px-2 py-0.5 rounded">
          PR
        </span>
        <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded">
          {item.badge}
        </span>
      </div>
      <h3 className="text-lg font-bold mb-1">{item.name}</h3>
      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-block bg-gray-900 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        {item.cta} →
      </a>
    </div>
  )
}
