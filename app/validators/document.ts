import vine from '@vinejs/vine'

export const uploadDocumentsValidator = vine.compile(
  vine.object({
    // collection_id: vine.string().trim(),
    documents: vine.array(vine.file({ extnames: ['pdf', 'docx', 'txt'] })).minLength(1),
  })
)

export const deleteDocumentValidator = vine.compile(
  vine.object({
    ids: vine.array(vine.number()).minLength(1),
  })
)
