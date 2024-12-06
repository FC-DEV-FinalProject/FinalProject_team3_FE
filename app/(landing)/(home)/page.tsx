import AverageMetricsSection from './_ui/average-metrics-section'
import HeroSection from './_ui/hero-section'
import TopFavoriteSection from './_ui/top-favorite-section'
import TopSmScoreSection from './_ui/top-sm-score-section'
import UserMetricsSection from './_ui/user-metrics-section'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <UserMetricsSection />
      <TopFavoriteSection />
      <AverageMetricsSection />
      <TopSmScoreSection />
    </>
  )
}

export default HomePage
