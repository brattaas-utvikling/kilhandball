import * as React from "react"
import { motion } from "framer-motion"
import { utviklingSections, modalContent } from "./utviklingsdata"
import { UtviklingSplitLevels } from "./UtviklingSplitLevels"
import {
  SectionTitle,
  Paragraphs,
  Callout,
  ComparisonCard,
  SourceLink,
  ResourceGrid,
  ProgresjonTable,
} from "./UtviklingUI"
import { DeepDiveModal } from "./DeepDiveModal"
import type { UTheme } from "./theme"
import { UIcon } from "./icons"

type ActiveModal = { id: string; theme: UTheme } | null

export default function Utviklingstrappa() {
  const [activeModal, setActiveModal] = React.useState<ActiveModal>(null)

  const openModal = (id: string, theme: UTheme) => setActiveModal({ id, theme })
  const closeModal = () => setActiveModal(null)

  const modalDoc = activeModal ? modalContent[activeModal.id] : null

  return (
    <div className="min-h-screen py-8 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-anton-3xl md:text-anton-5xl font-anton text-kilsvart mb-4 uppercase"
          >
            Utviklingstrappa
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-kilsvart mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-kilsvart-500 font-roboto max-w-3xl mx-auto leading-relaxed"
          >
            Håndballforbundets rammeverk for utvikling av barn og unge – fra 6 til 20 år
          </motion.p>
        </motion.div>

        {/* ── Sections ── */}
        <div className="space-y-14">
          {utviklingSections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45 }}
            >
              {/* ─── LEVELS ─── */}
              {section.type === "levels" ? (
                <div>
                  <SectionTitle
                    icon={<UIcon name={section.icon} className="w-5 h-5" />}
                    title={section.title}
                    theme={section.theme}
                  />
                  {section.intro ? (
                    <p className="text-kilsvart-600 text-sm leading-relaxed mb-5">{section.intro}</p>
                  ) : null}
                  <UtviklingSplitLevels
                    title={section.title}
                    tagLabel={section.tagLabel}
                    theme={section.theme}
                    levels={section.levels}
                    onOpenModal={openModal}
                  />
                  {section.callouts?.length ? (
                    <div className="mt-5 space-y-3">
                      {section.callouts.map((c, i) => (
                        <Callout key={i} tone={c.tone} title={c.title} text={c.text} theme={section.theme} />
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* ─── RICH ─── */}
              {section.type === "rich" ? (
                <div>
                  <SectionTitle
                    icon={<UIcon name={section.icon} className="w-5 h-5" />}
                    title={section.title}
                    theme={section.theme}
                  />
                  <div className="space-y-5">
                    <Paragraphs items={section.paragraphs} />

                    {section.cards?.length ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.cards.map((c, i) => (
                          <ComparisonCard key={i} heading={c.heading} text={c.text} tone={c.tone} />
                        ))}
                      </div>
                    ) : null}

                    {section.callouts?.length ? (
                      <div className="space-y-3">
                        {section.callouts.map((c, i) => (
                          <Callout key={i} tone={c.tone} title={c.title} text={c.text} theme={section.theme} />
                        ))}
                      </div>
                    ) : null}

                    {section.source ? (
                      <SourceLink label={section.source.label} url={section.source.url} theme={section.theme} />
                    ) : null}
                  </div>
                </div>
              ) : null}

              {/* ─── TABLE ─── */}
              {section.type === "table" ? (
                <div>
                  <SectionTitle
                    icon={<UIcon name={section.icon} className="w-5 h-5" />}
                    title={section.title}
                    theme={section.theme}
                  />
                  <div className="space-y-5">
                    <Paragraphs items={section.paragraphs} />
                    <ProgresjonTable rows={section.rows} theme={section.theme} />
                  </div>
                </div>
              ) : null}

              {/* ─── RESOURCES ─── */}
              {section.type === "resources" ? (
                <div>
                  <SectionTitle
                    icon={<UIcon name={section.icon} className="w-5 h-5" />}
                    title={section.title}
                    theme={section.theme}
                  />
                  <div className="space-y-5">
                    {section.paragraphs?.length ? <Paragraphs items={section.paragraphs} /> : null}
                    <ResourceGrid items={section.resources} theme={section.theme} />
                  </div>
                </div>
              ) : null}
            </motion.div>
          ))}
        </div>

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-14 pt-8 border-t border-kilsvart-50 text-center"
        >
    <div className="w-full h-auto flex items-center justify-center">
                        <img
                          src="https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/68d03bd90025fb011d7f/view?project=68a9f0da0014cb9bd6ad&mode=admin"
                          alt="KIL Håndball Logo"
                          className="w-auto h-1/2 object-contain object-center aspect-video overflow-hidden"
                        />
                      </div>
                      <p className="text-kilsvart-400 text-sm">
            <strong>Kilde:</strong> Norges Håndballforbund – Utviklingstrappa
          </p>
        </motion.div>
      </div>

      {/* ── Modal ── */}
      {modalDoc && activeModal ? (
        <DeepDiveModal isOpen onClose={closeModal} doc={modalDoc} theme={activeModal.theme} />
      ) : null}
    </div>
  )
}