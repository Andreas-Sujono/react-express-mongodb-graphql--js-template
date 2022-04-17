export default function makeBaseDb(dbModel) {
  return new (class MongooseEntitiesDb {
    async findOne(payloadCondition = {}) {
      const resultOne = await dbModel.findOne(payloadCondition);

      if (resultOne) {
        return resultOne;
      }

      return null;
    }

    async findAll(condition = {}) {
      const resultAll = await dbModel.find(condition);

      if (resultAll) {
        return resultAll || [];
      }

      return [];
    }

    async findById(id) {
      const resultOne = await dbModel.findById(id);

      if (resultOne) {
        return resultOne;
      }
      return null;
    }

    async insert(payload) {
      payload.created_at = new Date();
      const created = await dbModel.create(payload);

      if (created) {
        return created;
      }
      return null;
    }

    async update(payload, options = {}) {
      const finalOptions = { upsert: true, new: true, ...options };
      payload.updated_at = new Date();
      const updated = await dbModel.findOneAndUpdate(
        { _id: payload._id || payload.id },
        payload,
        finalOptions
      );

      if (updated) {
        return updated;
      }
      return null;
    }

    async hardDeleteById(id) {
      const prevRecord = await dbModel.findById(id);
      const deletedResult = await dbModel.deleteOne({ _id: id });
      if (prevRecord && deletedResult.ok) {
        return prevRecord;
      }
      return null;
    }

    async softDeleteById(id, options = {}) {
      const finalOptions = { ...options, new: true };
      const updated = await dbModel.findOneAndUpdate(
        { _id: id },
        {
          deleted_at: new Date(),
        },
        finalOptions
      );

      if (updated) {
        return updated;
      }
      return null;
    }
  })();
}
